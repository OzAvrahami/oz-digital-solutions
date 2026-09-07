import { notFound } from 'next/navigation'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import WhatsAppAction from '@/components/contact/WhatsAppAction'
import { siteConfig } from '@/config/site'
import { getDictionary, isLocale } from '@/lib/i18n'
import { createLocalizedMetadata } from '@/lib/metadata'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()
  return createLocalizedMetadata({ locale, pathname: '/accessibility', title: locale === 'he' ? 'הצהרת נגישות — עוז אברהמי' : 'Accessibility statement — Oz Avrahami', description: locale === 'he' ? 'אפשרויות הנגישות באתר ודרכים לפנייה בנושא נגישות.' : 'Website accessibility features, review limits and accessibility contact details.' })
}

export default async function AccessibilityPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()
  const dictionary = getDictionary(locale)
  const he = locale === 'he'
  return <><Header locale={locale} dictionary={dictionary} /><main className="statement-page" id="main-content" tabIndex={-1}><article>{he ? <>
      <div className="eyebrow">נוח יותר לכולם</div>
      <h1>הצהרת נגישות</h1>
      <p className="statement-date">עודכן לאחרונה: 7 בספטמבר 2026</p>
      <p>חשוב לי לאפשר לכמה שיותר אנשים להשתמש באתר בנוחות ולקבל מידע על השירותים שלי. הצהרה זו מתייחסת לאתר שבו היא מפורסמת.</p>
      <h2>התאמות שבוצעו באתר</h2>
      <ul>
        <li>קישור לדילוג לתוכן הראשי, כותרות מסודרות ותוויות לשדות הטופס.</li>
        <li>אפשרות להפעלת התפריט, השאלות והתשובות וכפתורי האתר באמצעות מקלדת, עם סימון ברור של הרכיב שנבחר.</li>
        <li>כפתור נגישות המאפשר עצירת תנועה והפעלת ניגודיות מוגברת. ההעדפות נשמרות בדפדפן שלכם.</li>
        <li>התחשבות בהעדפת הפחתת התנועה של המכשיר ואפשרות להשהות את האנימציות גם מתוך ההמחשה בראש העמוד.</li>
        <li>כפתור חזרה למעלה המחזיר גם את מיקוד המקלדת לכותרת הראשית.</li>
        <li>תצוגה מותאמת למסכים שונים, ללא חסימת אפשרות ההגדלה של הדפדפן, ותמיכה בעברית ובאנגלית.</li>
      </ul>
      <h2>איך משתמשים באפשרויות הנגישות?</h2>
      <p>בכל עמוד, לחצו על כפתור הנגישות העגול בפינה הימנית התחתונה. השתמשו במקש Tab למעבר בין רכיבים וב־Enter או ברווח להפעלת כפתורים. אפשר לסגור את חלון האפשרויות באמצעות Escape. להגדלת התצוגה השתמשו בהגדרות הזום של הדפדפן.</p>
      <h2>מצב הבדיקה</h2>
      <p>נוספו התאמות נגישות ונבדקו היבטים במבנה ובקוד האתר. טרם הושלמה בדיקת נגישות מלאה, לרבות בדיקה עם קוראי מסך ובמגוון דפדפנים. הצהרה זו אינה אישור לעמידה מלאה בתקן הישראלי ת״י 5568 ברמה AA.</p>
      <p>האתר מפנה גם לשירותים חיצוניים, כגון WhatsApp ו־LinkedIn. ההתאמות המפורטות כאן מתייחסות לעמודי האתר הזה. אם נתקלתם בקושי בקבלת מידע או ביצירת קשר, אפשר לפנות אליי באחת הדרכים הבאות.</p>
      </> : <>
      <div className="eyebrow">A more comfortable experience</div>
      <h1>Accessibility statement</h1>
      <p className="statement-date">Last updated: September 7, 2026</p>
      <p>I want as many people as possible to use this website comfortably and find information about my services. This statement applies to the website on which it is published.</p>
      <h2>Features added to this website</h2>
      <ul>
        <li>A skip-to-content link, structured headings, and labeled form fields.</li>
        <li>Keyboard controls for navigation, FAQ answers, and buttons, with visible focus indicators.</li>
        <li>Accessibility options for pausing motion and increasing contrast. Your preferences are saved in your browser.</li>
        <li>Support for your device’s reduced-motion preference and a separate animation pause button in the introductory illustration.</li>
        <li>A back-to-top button that also returns keyboard focus to the main heading.</li>
        <li>A responsive layout, browser zoom enabled, and Hebrew and English content.</li>
      </ul>
      <h2>Using the accessibility options</h2>
      <p>On any page, select the round accessibility button in the lower-right corner. Use Tab to move between controls and Enter or Space to activate buttons. Escape closes the options dialog. Use your browser’s zoom settings to enlarge the page.</p>
      <h2>Review status</h2>
      <p>Accessibility features have been added and aspects of the page structure and code have been checked. A full accessibility assessment, including screen-reader and cross-browser testing, has not been completed. This statement does not certify full compliance with Israeli Standard 5568 at level AA.</p>
      <p>This website also links to external services such as WhatsApp and LinkedIn. The features described here apply to this website’s pages. If you have difficulty accessing information or getting in touch, please use one of the contact methods below.</p>
      </>}
    <section className="statement-contact" aria-labelledby="accessibility-contact"><h2 id="accessibility-contact">{he ? 'פנייה בנושא נגישות' : 'Accessibility enquiries'}</h2><p>{dictionary.identity.name}</p><p><a href={`mailto:${siteConfig.email}?subject=${encodeURIComponent(he ? 'פנייה בנושא נגישות' : 'Accessibility enquiry')}`} dir="ltr">{siteConfig.email}</a><br /><a href={`tel:+${siteConfig.whatsappNumber}`} dir="ltr">+{siteConfig.whatsappNumber}</a><br /><WhatsAppAction locale={locale} /></p><p>{he ? 'כדי שאוכל לבדוק ולטפל בפנייה, כדאי לצרף את כתובת העמוד, תיאור של הקושי ודרך נוחה לחזור אליכם. אפשר לציין גם את הדפדפן או אמצעי העזר שבהם השתמשתם.' : 'Please include the page address, a description of the difficulty, and a convenient way to reach you. You can also include the browser or assistive technology you were using.'}</p></section>
  </article></main><Footer locale={locale} dictionary={dictionary} /></>
}

