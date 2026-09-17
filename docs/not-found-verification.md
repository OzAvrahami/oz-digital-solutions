# Localized Not Found experience

Issue [#7](https://github.com/OzAvrahami/oz-digital-solutions/issues/7). Implementation is local; owner visual acceptance and production verification remain required.

## Routing choice

The existing root layout is `src/app/[locale]/layout.tsx`. Locale, service and guide routes use `dynamicParams = false` and generated static parameters. Unknown top-level paths do not enter that layout, and unlisted dynamic parameters can be rejected before a locale boundary renders.

Use the installed Next.js 16.2.1 **experimental `globalNotFound`** option with one `src/app/global-not-found.tsx`. [Next.js documents this mechanism](https://nextjs.org/docs/app/api-reference/file-conventions/not-found) for applications with top-level dynamic root layouts. No root layout restructuring, locale boundary, catch-all, proxy/middleware or custom server is needed for the verified route matrix.

`connection()` makes only the global 404 request-rendered. `NotFoundDocument` uses `usePathname()` during initial server rendering to select English for an exact first `en` segment, otherwise Hebrew. This supplies localized HTML, `lang`, `dir`, title and links **before hydration**, including with JavaScript disabled. It avoids a statically cached `/_not-found` document selecting one language for all URLs. Existing valid pages retain their static generation and `notFound()` guards.

The global boundary returns its own document and imports the existing local Heebo font, flow styles, icons and `Preferences` controls. New CSS is scoped to the 404. It reuses the approved wordmark/button treatment with a small header, recovery card and accessibility link instead of the full homepage shell. No analytics or contact controls are added to the 404. Home/guide links are native anchors; Services uses the existing localized homepage `#services` anchor.

Next.js automatically supplies one `robots: noindex` meta tag. No additional robots directive, normal-page canonical, hreflang, social metadata or structured data is assigned to missing content. The actual HTML is checked for these properties. The requested URL remains unchanged and every tested missing URL returns HTTP 404. The root 308 redirect and valid-page metadata remain unchanged.

The experimental boundary and its request-rendered locale behavior should be reverified when Next.js is upgraded. There are no dependency or package-version changes.

## Repeat locally

```powershell
npm run lint
npm run typecheck
npm run build
npm run start -- --hostname 127.0.0.1 --port 3008
```

In another shell, use an existing Playwright installation and Chrome, as with the other repository checks (do not add a runtime dependency):

```powershell
$env:PLAYWRIGHT_MODULE = 'file:///absolute/path/to/playwright/index.mjs'
$env:REVIEW_ORIGIN = 'http://127.0.0.1:3008'
node scripts/check-not-found.mjs
node scripts/check-social-metadata.mjs
node scripts/check-contact.mjs
node scripts/check-whatsapp.mjs
$env:REVIEW_ORIGIN = 'http://redesign-review.test:3008'
node scripts/check-redesign-browser.mjs
git diff --check
```

The redesign script maps its hostname to localhost in Chrome. The new check and metadata check restrict the origin to localhost. Browser requests to external hosts are blocked; contact delivery is stubbed/intercepted in the existing scripts.

## Verification coverage

- 13 missing URLs: unknown root path, `/fr`, `/fr/anything`; unknown localized pages; invalid service/guide slugs; retired Open Graph routes with/without the historical query string in both languages.
- Each response must be 404 without a Location header. Initial response HTML must already have the correct language, direction, heading, recovery links and one effective noindex directive, without content canonical/hreflang.
- Ten valid controls: home, websites service, guide index, business-website-cost article and accessibility page in each language. All must remain 200 with their existing production canonical/hreflang.
- Root remains 308 with `Location: /he`. Sitemap retains 18 unique localized URLs and includes no missing-page/root content URL. The existing social check verifies robots, the complete sitemap route set and four user-agent metadata/image behavior.
- Hebrew and English at 360, 390, 768 and 1440px: correct font, no overflow/clipping, readable content with reduced motion, 44px-or-larger recovery targets, text contrast at least 4.5:1 on the card, skip link, keyboard order, visible focus and working guide navigation.
- Persisted contrast/motion preferences and dialog focus return, forced-colors visibility, home navigation and 720×450 at device scale 2 as a **200%-equivalent layout viewport**. This is not a full physical-device/browser-zoom or screen-reader assessment.
- Screenshots for manual review: `.tmp/not-found-review/he-360.png` through `en-1440.png` (ignored local artifacts).

## Missing-route diagnostics

Baseline production-build probes reproduced `Internal: NoFallbackError` with the generic 404. It still occurs for unlisted statically restricted dynamic paths after this implementation; localized unknown paths without a matching page do not need that rejection path.

The installed `next/dist/build/templates/app-page.js` explicitly throws `NoFallbackError` when `dynamicParams: false` rejects a path that was not prerendered. Its request-error handler excludes that signal; Next's routing code uses it to continue to not-found handling. The diagnostic can still appear in local server logs. The verified responses have HTTP 404, correct branded localized HTML/noindex and no browser page errors, rather than a 500 or a broken page.

This is retained framework diagnostic output, not a claim that all Next.js logging is harmless. No logging suppression, framework patch or change to `dynamicParams` is made solely to hide it. Reassess if a future version changes status or rendering.

## Owner acceptance

Review both `/he/this-page-does-not-exist` and `/en/this-page-does-not-exist` on the local production server, plus `/fr/anything` for Hebrew fallback. Confirm visual fit, copy, RTL/LTR, mobile spacing, keyboard focus and recovery links. The global fallback uses the same branded document as a Hebrew-context 404.

After owner-controlled commit/push/deployment, repeat HTTP status/noindex and valid-page/root regression checks on production before closure. Physical-device, cross-browser, native browser zoom and screen-reader review remain manual; no accessibility certification is claimed. Issue #6 remains completed and untouched.
