import { Search, Map, Code2, Rocket } from 'lucide-react'

const steps = [
  {
    number: '01',
    icon: Search,
    title: 'גילוי ואבחון',
    description: 'שיחת היכרות מעמיקה להבנת העסק, המטרות, הקהל, והאתגרים. בשלב הזה אני בונה תמונה מלאה לפני שמתחילים.',
    color: 'from-blue-500 to-blue-600',
  },
  {
    number: '02',
    icon: Map,
    title: 'תכנון ואסטרטגיה',
    description: 'בניית תכנית עבודה מפורטת — ארכיטקטורה, עיצוב, טכנולוגיה, לוח זמנים ויעדים ברורים. בלי הפתעות בדרך.',
    color: 'from-violet-500 to-purple-600',
  },
  {
    number: '03',
    icon: Code2,
    title: 'עיצוב ופיתוח',
    description: 'ביצוע מקצועי עם עדכונים שוטפים. אתם רואים את ההתקדמות, מגיבים, ומקבלים בדיוק את מה שדיברנו.',
    color: 'from-cyan-500 to-teal-500',
  },
  {
    number: '04',
    icon: Rocket,
    title: 'השקה ואופטימיזציה',
    description: 'השקה מלאה, בדיקות, הדרכה ותמיכה לאחר ההשקה. לא נעלמים אחרי — ממשיכים לוודא שהכל עובד ומשפיע.',
    color: 'from-amber-500 to-orange-500',
  },
]

export default function Process() {
  return (
    <section id="process" className="relative py-24 bg-[#060b14] overflow-hidden">
      {/* Background */}
      <div className="absolute bottom-0 left-0 right-0 h-[400px] bg-gradient-to-t from-[#0d1526] to-transparent pointer-events-none" />
      <div className="absolute inset-0 section-pattern opacity-20 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-medium uppercase tracking-wider">
            איך זה עובד
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white">
            תהליך עבודה{' '}
            <span className="gradient-text">שקוף ומובנה</span>
          </h2>
          <p className="max-w-2xl mx-auto text-slate-400 text-lg">
            כל פרויקט עובר תהליך מוגדר — כדי שתדעו בדיוק מה קורה, מתי, ולמה.
          </p>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Connecting line (desktop) */}
          <div className="hidden lg:block absolute top-20 right-[calc(12.5%+28px)] left-[calc(12.5%+28px)] h-0.5 bg-gradient-to-r from-blue-500/20 via-cyan-500/20 to-amber-500/20 pointer-events-none" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step) => {
              const Icon = step.icon
              return (
                <div
                  key={step.number}
                  className="relative flex flex-col items-center text-center space-y-5 group"
                >
                  {/* Step circle */}
                  <div className="relative">
                    <div className={`relative z-10 w-16 h-16 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-7 h-7 rounded-lg bg-[#0f1a2e] border border-[#1e3a5f] flex items-center justify-center">
                      <span className="text-xs font-black text-blue-400">{step.number}</span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="space-y-2">
                    <h3 className="text-lg font-bold text-white group-hover:text-blue-300 transition-colors">
                      {step.title}
                    </h3>
                    <p className="text-slate-400 text-sm leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <a
            href="#contact"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-blue-600 to-blue-500 text-white text-base font-bold hover:from-blue-500 hover:to-cyan-500 transition-all duration-300 shadow-[0_0_30px_rgba(59,130,246,0.3)] hover:shadow-[0_0_60px_rgba(59,130,246,0.4)]"
          >
            <span>מוכנים להתחיל?</span>
          </a>
        </div>
      </div>
    </section>
  )
}
