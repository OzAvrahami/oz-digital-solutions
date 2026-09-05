import type { Locale } from '@/lib/i18n'

const disclosureByLocale: Record<Locale, string> = {
  he: 'חלק מהקישורים במדריך עשויים להיות קישורי שותפים. אם תרכשו שירות דרך קישור כזה, ייתכן שאקבל עמלה ללא עלות נוספת עבורכם. ההמלצות באתר מבוססות על התאמה ושימושיות ולא על גובה העמלה.',
  en: 'Some links in this guide may be affiliate links. If you purchase a service through one of these links, I may earn a commission at no additional cost to you. Recommendations are based on suitability and usefulness, not commission rates.',
}

interface AffiliateDisclosureProps {
  locale: Locale
}

export default function AffiliateDisclosure({ locale }: AffiliateDisclosureProps) {
  return (
    <aside className="guide-reading-disclosure mt-8 rounded-control border px-5 py-4 text-[13px] leading-[1.7]">
      {disclosureByLocale[locale]}
    </aside>
  )
}
