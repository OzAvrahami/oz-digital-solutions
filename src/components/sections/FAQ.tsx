'use client'

import { useState } from 'react'
import { Plus, Minus } from 'lucide-react'

const faqs = [
  {
    q: 'כמה עולה לפתח אתר?',
    a: 'המחיר תלוי בסוג האתר ומורכבות הפרויקט. אתרי תדמית מתחילים ב-3,000 ₪, חנויות אונליין מ-6,000 ₪, ומערכות מורכבות לפי פירוט. בכל מקרה מקבלים הצעת מחיר מפורטת לאחר שיחת גילוי חינם.',
  },
  {
    q: 'כמה זמן לוקח לפתח אתר?',
    a: 'אתר תדמית: 2-3 שבועות. חנות אונליין: 3-5 שבועות. מערכות מותאמות: 4-8 שבועות. הזמן תלוי גם בזמינות מהצד שלכם לאישורים ומשובים.',
  },
  {
    q: 'האם אתם עובדים עם עסקים קטנים?',
    a: 'בהחלט! אני עובד עם עסקים מכל הגדלים — מעצמאים ועד חברות בינוניות. המחיר והפתרון מותאמים לגודל העסק ולצרכים הספציפיים שלו.',
  },
  {
    q: 'מה קורה אחרי שהאתר עולה לאוויר?',
    a: 'אני לא נעלם אחרי ההשקה. כל לקוח מקבל תמיכה ראשונית לאחר ההשקה, הדרכה על ניהול האתר, ואפשרות לחבילת תחזוקה חודשית.',
  },
  {
    q: 'האם ניתן לשנות את האתר בעתיד?',
    a: 'כן, בהחלט. הפתרונות שאני בונה מתוכננים להיות גמישים וניתנים לשינוי. תוכלו לעדכן תכנים בעצמכם, ולבקש שינויים ועדכונים גדולים יותר לפי הצורך.',
  },
  {
    q: 'מה ההבדל בין אוטומציה לבין פיתוח מותאם אישית?',
    a: 'אוטומציה היא חיבור כלים קיימים (כמו CRM, email, WhatsApp) לזרימת עבודה אוטומטית. פיתוח מותאם הוא בניית מערכת חדשה מאפס שמותאמת לצרכים שלכם ולא קיימת בשוק.',
  },
  {
    q: 'האם צריך לשלם מראש?',
    a: 'לרוב עובדים עם 50% מקדמה בתחילת הפרויקט ו-50% עם ההשקה. לפרויקטים גדולים יותר ניתן לחלק לתשלומי ביניים לפי אבני דרך.',
  },
  {
    q: 'איך מתחילים?',
    a: 'פשוט מאוד — צרו קשר דרך הטופס למטה, תנו לי פרטים בסיסיים על הפרויקט, ונקבע שיחת גילוי של 30 דקות לגמרי חינם. מהשיחה תצאו עם בהירות מלאה על הדרך קדימה.',
  },
]

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section id="faq" className="relative py-24 bg-[#0d1526] overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 section-pattern opacity-20 pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-medium uppercase tracking-wider">
            שאלות ותשובות
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white">
            שאלות נפוצות
          </h2>
          <p className="max-w-2xl mx-auto text-slate-400 text-lg">
            כאן תמצאו תשובות לשאלות הנפוצות ביותר. משהו לא ברור? פשוט שאלו.
          </p>
        </div>

        {/* FAQ accordion */}
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                openIndex === i
                  ? 'bg-[#132035] border-blue-500/30'
                  : 'bg-[#0f1a2e] border-[#1e3a5f]/60 hover:border-blue-500/20'
              }`}
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between gap-4 p-6 text-right"
                aria-expanded={openIndex === i}
              >
                <span className="text-base font-semibold text-white">{faq.q}</span>
                <div className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-300 ${
                  openIndex === i ? 'bg-blue-500' : 'bg-[#1e3a5f]/60'
                }`}>
                  {openIndex === i
                    ? <Minus className="w-4 h-4 text-white" />
                    : <Plus className="w-4 h-4 text-slate-400" />
                  }
                </div>
              </button>

              <div className={`transition-all duration-300 overflow-hidden ${
                openIndex === i ? 'max-h-96' : 'max-h-0'
              }`}>
                <div className="px-6 pb-6">
                  <p className="text-slate-400 text-sm leading-relaxed border-t border-[#1e3a5f]/40 pt-4">
                    {faq.a}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
