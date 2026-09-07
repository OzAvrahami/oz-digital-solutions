// Optional browser QA: use an existing Playwright installation; no runtime dependency is added.
const { chromium } = await import(process.env.PLAYWRIGHT_MODULE || 'playwright')
import assert from 'node:assert/strict'
const origin = process.env.REVIEW_ORIGIN || 'http://redesign-review.test:3007'
assert.equal(new URL(origin).hostname, 'redesign-review.test', 'Only the locally mapped QA hostname is allowed')
const browser = await chromium.launch({channel:'chrome',headless:true,args:['--host-resolver-rules=MAP redesign-review.test 127.0.0.1','--no-proxy-server']})
const messages={he:'היי עוז, הגעתי דרך האתר ואשמח לדבר איתך על הפרויקט שלי.',en:'Hi Oz, I found your website and would like to discuss my project.'}
const paths=['','/services/websites','/guides','/guides/business-website-cost-2026','/accessibility']
let checks=0
try {
  for(const width of [360,390,768,1440,1920]) {
    const context=await browser.newContext({viewport:{width,height:900},hasTouch:width<1000})
    let postMode='blocked'
    let posts=0
    const destinations=[]
    await context.route('**/*',async route=>{
      const request=route.request(), url=new URL(request.url())
      if(url.hostname==='redesign-review.test' && request.method()==='GET') return route.continue()
      if(url.hostname==='wa.me'){destinations.push(request.url());return route.fulfill({contentType:'text/html',body:'Intercepted locally; no message sent.'})}
      if(request.method()==='POST' && url.hostname==='redesign-review.test') {
        posts++
        if(postMode==='blocked') return route.abort()
        await new Promise(resolve=>setTimeout(resolve,350))
        const result=postMode==='success'?{status:'success',message:'Local QA success — no message sent.'}:{status:'error',message:'Local QA validation error',fieldErrors:{name:'Local QA name required'}}
        return route.fulfill({contentType:'text/x-component',body:`0:{"a":"$@1","f":"","b":"local-qa"}\n1:${JSON.stringify(result)}\n`})
      }
      return route.abort()
    })
    const page=await context.newPage()
    const errors=[]
    page.on('pageerror',e=>errors.push(e.message))
    for(const locale of ['he','en']) {
      for(const suffix of paths) {
        const response=await page.goto(`${origin}/${locale}${suffix}?qa=private`)
        assert.equal(response.status(),200)
        await page.locator('main h1').waitFor()
        await page.evaluate(()=>document.fonts.ready)
        await page.waitForFunction(()=>document.documentElement.classList.contains('motion-ready'))
        const state=await page.evaluate(()=>({dir:document.documentElement.dir,width:innerWidth,scroll:document.documentElement.scrollWidth,canonical:document.querySelector('link[rel="canonical"]')?.href,impact:document.querySelector('meta[name="impact-site-verification"]')?.content,dupes:[...document.querySelectorAll('[id]')].map(e=>e.id).filter((id,i,all)=>all.indexOf(id)!==i)}))
        assert.equal(state.dir,locale==='he'?'rtl':'ltr')
        assert.ok(state.scroll<=width+1,`overflow ${locale}${suffix} ${width}: ${state.scroll}`)
        assert.equal(state.canonical,`https://ozavrahami.co.il/${locale}${suffix}`)
        assert.equal(await page.locator('meta[name="impact-site-verification"]').getAttribute('value'),'7a3491ac-fb9c-427e-a0ab-1cdbed824e88')
        assert.deepEqual(state.dupes,[])
        assert.equal(await page.locator('iframe, a[href*="project-previews"], a[href$="#work"]').count(),0)
        const floating=page.locator('[data-whatsapp-placement="floating"]')
        assert.equal(await floating.count(),1)
        assert.equal(await floating.getAttribute('href'),`https://wa.me/972506795903?text=${encodeURIComponent(messages[locale])}`)
        const alternate=locale==='he'?'en':'he'
        assert.ok((await page.locator('.lang-button').getAttribute('href')).endsWith(`/${alternate}${suffix}`))
        if(width<761) {
          await page.locator('.menu-toggle').tap()
          await page.locator('#mobile-menu').waitFor()
          await page.waitForFunction(()=>document.querySelector('[data-whatsapp-placement="floating"]').hidden)
          await page.keyboard.press('Escape')
          assert.equal(await page.locator('#mobile-menu').count(),0)
          assert.ok(await page.locator('.menu-toggle').evaluate(e=>e===document.activeElement))
        }
        if(!suffix) {
          assert.equal(await page.locator('.tools-grid .tool-card').count(),16)
          assert.equal(await page.locator('.tools-secondary-grid .tool-card').count(),3)
          assert.equal(await page.locator('.services-grid .service-card').count(),5)
          await page.locator('.scene-motion').click()
          await page.waitForFunction(()=>document.documentElement.classList.contains('motion-paused'))
          assert.equal(await page.locator('.scene-motion').getAttribute('aria-pressed'),'true')
          await page.locator('.run-flow').click()
          assert.ok(await page.locator('.flow-status').textContent())
          await page.evaluate(()=>scrollTo(0,0))
          await page.locator('.accessibility-button').click()
          assert.ok(await page.locator('dialog').evaluate(e=>e.open))
          assert.equal(await page.locator('dialog input').nth(0).isChecked(),true)
          await page.locator('dialog input').nth(1).check()
          await page.waitForFunction(()=>document.documentElement.classList.contains('high-contrast'))
          await page.keyboard.press('Escape')
          assert.ok(await page.locator('.accessibility-button').evaluate(e=>e===document.activeElement))
          assert.notEqual(await page.locator('body').evaluate(e=>e.style.overflow),'hidden')
          assert.equal(await page.locator('.reveal').evaluateAll(elements=>elements.every(e=>getComputedStyle(e).opacity==='1')),true)
          await page.reload()
          await page.waitForFunction(()=>document.documentElement.classList.contains('high-contrast')&&document.documentElement.classList.contains('motion-paused'))
          await page.locator('.faq-question').nth(1).focus()
          await page.keyboard.press('Enter')
          assert.equal(await page.locator('.faq-question').nth(1).getAttribute('aria-expanded'),'true')
          assert.equal(await page.locator('.faq-question').nth(0).getAttribute('aria-expanded'),'false')
          await page.locator('#contact').scrollIntoViewIfNeeded()
          await page.waitForFunction(()=>document.querySelector('[data-whatsapp-placement="floating"]').hidden)
          await page.locator('input[name="name"]').fill('Local QA')
          await page.locator('input[name="contact"]').fill('qa@example.invalid')
          await page.locator('textarea[name="message"]').fill('Local intercepted UI check')
          postMode='error'
          const before=posts
          await page.locator('button[type="submit"]').click()
          assert.equal(await page.locator('button[type="submit"]').isDisabled(),true)
          await page.locator('.studio-form-alert').waitFor()
          assert.equal(await page.locator('.studio-form-alert').textContent(),'Local QA validation error')
          assert.equal(posts,before+1)
          assert.equal(await page.locator('input[name="name"]').getAttribute('aria-invalid'),'true')
          postMode='success'
          await page.locator('button[type="submit"]').click()
          await page.getByText('Local QA success — no message sent.').waitFor()
          postMode='blocked'
          await page.locator('#tools').evaluate(e=>scrollTo(0,e.getBoundingClientRect().top+scrollY+100))
          await page.locator('.back-to-top').click()
          assert.equal(await page.locator('main h1').evaluate(e=>e===document.activeElement),true)
          await page.waitForFunction(()=>scrollY===0)
          await page.locator('.accessibility-button').click()
          await page.locator('dialog a').click()
          await page.waitForURL(`**/${locale}/accessibility`)
          assert.notEqual(await page.locator('body').evaluate(e=>e.style.overflow),'hidden')
          assert.equal(await page.locator('dialog').evaluate(e=>e.open),false)
          await page.locator('.identity').click()
          await page.waitForURL(url=>url.pathname===`/${locale}`)
          await page.locator('.accessibility-button').click()
          await page.locator('.preference-reset').click()
          await page.keyboard.press('Escape')
        }
        if(width===1440 && suffix==='/services/websites') {
          await page.evaluate(()=>{window.qaEvents=[];window.gtag=(...args)=>window.qaEvents.push(args)})
          await floating.waitFor({state:'visible'})
          const popupPromise=context.waitForEvent('page')
          await floating.focus(); await page.keyboard.press('Enter')
          const popup=await popupPromise;await popup.waitForLoadState('domcontentloaded');await popup.close()
          assert.equal(destinations.at(-1),`https://wa.me/972506795903?text=${encodeURIComponent(messages[locale])}`)
          assert.deepEqual(await page.evaluate(()=>window.qaEvents),[['event','whatsapp_click',{locale,page_path:`/${locale}${suffix}`,button_placement:'floating'}]])
        }
        if ([360, 1440].includes(width) && suffix) await page.screenshot({ path: `.tmp/review-${locale}-${width}-${suffix.split('/').at(-1)}.png` })
        checks++
        console.log('PASS',locale,suffix||'home',width)
      }
    }
    assert.deepEqual(errors,[])
    await context.close()
  }
  console.log(`PASS ${checks} route/locale/viewport combinations; mocked contact UI, keyboard/touch, preferences and WhatsApp. External requests blocked.`)
}finally{await browser.close()}
