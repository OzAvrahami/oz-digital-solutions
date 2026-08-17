import { Target, Lightbulb, Code, TrendingUp, Layers, CheckCircle2 } from 'lucide-react'

const features = [
  {
    icon: Target,
    title: 'חשיבה עסקית, לא רק טכנית',
    description: 'אני לא רק כותב קוד — אני מבין את המטרות העסקיות ובונה פתרונות שמשרתים אותן.',
  },
  {
    icon: Lightbulb,
    title: 'פתרונות מותאמים אישית',
    description: 'אין תבניות כאן. כל פתרון מתוכנן ומפותח מאפס בהתאם לצרכים הייחודיים של העסק שלכם.',
  },
  {
    icon: TrendingUp,
    title: 'מיקוד בתוצאות',
    description: 'מדדים ברורים, יעדים מוגדרים, ותוצאות שאפשר למדוד. הצלחתכם היא ההצלחה שלי.',
  },
  {
    icon: Layers,
    title: 'שילוב מלא: אתר + אוטומציה + AI',
    description: 'אני מספק פתרון שלם — לא רק אתר, אלא מערכת דיגיטלית שעובדת בשבילכם 24/7.',
  },
  {
    icon: Code,
    title: 'ביצוע נקי ומקצועי',
    description: 'קוד נקי, ביצועים מעולים, עיצוב ברמה גבוהה. כל פרויקט מוגש ברמת פינישים של אחד.',
  },
]

export default function WhyMe() {
  return (
    <section id="why-me" className="relative py-24 bg-[#0d1526] overflow-hidden">
      {/* Background accent */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-medium uppercase tracking-wider">
            למה אני?
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white">
            הבדל שאפשר{' '}
            <span className="gradient-text">להרגיש בתוצאות</span>
          </h2>
          <p className="max-w-2xl mx-auto text-slate-400 text-lg">
            יש הרבה מפתחים. אבל מעטים מאחדים חשיבה עסקית, טכנולוגיה מתקדמת ויכולת אמיתית לייצר תוצאות.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Features list */}
          <div className="space-y-6">
            {features.map((feature) => {
              const Icon = feature.icon
              return (
                <div
                  key={feature.title}
                  className="flex gap-5 p-5 rounded-2xl bg-[#0f1a2e] border border-[#1e3a5f]/40 hover:border-blue-500/30 transition-all duration-300 group"
                >
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center group-hover:bg-blue-500/20 transition-colors">
                    <Icon className="w-6 h-6 text-blue-400" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-white font-semibold text-base group-hover:text-blue-300 transition-colors">{feature.title}</h3>
                    <p className="text-slate-400 text-sm leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Value proposition panel */}
          <div className="space-y-5">
            {/* Main card */}
            <div className="p-8 rounded-3xl bg-gradient-to-br from-blue-600/20 to-cyan-600/10 border border-blue-500/20">
              <div className="space-y-4">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-[0_0_30px_rgba(59,130,246,0.3)]">
                  <Layers className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white">
                  פתרון דיגיטלי שלם — לא רק אתר
                </h3>
                <p className="text-slate-300 leading-relaxed">
                  בעולם של היום, אתר בלבד לא מספיק. העסקים שמנצחים הם אלה שמחברים בין נוכחות דיגיטלית חזקה, תהליכים אוטומטיים, וכלים חכמים. זה בדיוק מה שאני מספק.
                </p>
                <div className="space-y-2.5 pt-2">
                  {[
                    'אתר שממיר — לא רק נראה טוב',
                    'אוטומציה שחוסכת זמן ומשאבים',
                    'AI שמשפר את חוויית הלקוח',
                    'מדדים ברורים לכל שלב',
                  ].map((point) => (
                    <div key={point} className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-cyan-400 flex-shrink-0" />
                      <span className="text-slate-200 text-sm">{point}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Quick stats grid */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { value: '2-4 שבועות', label: 'זמן פיתוח ממוצע' },
                { value: '100%', label: 'מחויבות לאיכות' },
                { value: '24/7', label: 'מערכות שעובדות' },
                { value: 'ישיר', label: 'עבודה ישירה מולי' },
              ].map((stat) => (
                <div key={stat.label} className="p-4 rounded-2xl bg-[#0f1a2e] border border-[#1e3a5f]/40 text-center space-y-1">
                  <div className="text-2xl font-black gradient-text">{stat.value}</div>
                  <div className="text-xs text-slate-500">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
