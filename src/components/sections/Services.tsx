'use client'

import { Globe, ShoppingCart, Zap, Brain, Settings, GitMerge, ArrowLeft } from 'lucide-react'

const services = [
  {
    icon: Globe,
    title: 'פיתוח אתרים',
    description: 'אתרים מקצועיים, מהירים ומותאמים לייצור לידים. לא תבניות — אתרים שבנויים לעסק שלכם עם מטרה ברורה: להמיר מבקרים ללקוחות.',
    color: 'from-blue-500 to-blue-600',
    glow: 'rgba(59, 130, 246, 0.15)',
  },
  {
    icon: ShoppingCart,
    title: 'חנויות אונליין',
    description: 'פיתוח חנויות אי-קומרס מתקדמות עם חוויית קנייה חלקה, ניהול מלאי, סליקה מאובטחת ואופטימיזציה למכירות.',
    color: 'from-violet-500 to-purple-600',
    glow: 'rgba(139, 92, 246, 0.15)',
  },
  {
    icon: Zap,
    title: 'אוטומציות עסקיות',
    description: 'אוטומציה של תהליכים שחוזרים על עצמם — תזמון, תיעוד, שיווק, CRM ועוד. חסכו עשרות שעות בחודש וצמצמו טעויות אנוש.',
    color: 'from-amber-500 to-orange-500',
    glow: 'rgba(245, 158, 11, 0.15)',
  },
  {
    icon: Brain,
    title: 'פתרונות AI',
    description: 'שילוב כלי AI חכמים בתוך העסק שלכם — צ\'אטבוטים, ניתוח נתונים, יצירת תוכן אוטומטית, ועוד. AI שעובד בשביל העסק.',
    color: 'from-cyan-500 to-teal-500',
    glow: 'rgba(6, 182, 212, 0.15)',
  },
  {
    icon: Settings,
    title: 'מערכות מותאמות אישית',
    description: 'פיתוח מערכות ייחודיות שמותאמות בדיוק לצרכי העסק שלכם — ממשקי ניהול, כלים פנימיים, אפליקציות וכל מה שצריך.',
    color: 'from-emerald-500 to-green-600',
    glow: 'rgba(16, 185, 129, 0.15)',
  },
  {
    icon: GitMerge,
    title: 'אינטגרציות ו-API',
    description: 'חיבור מערכות קיימות, API, כלי שיווק, CRM ועוד. יוצרים אוסיסטם דיגיטלי שמאפשר לכל הכלים לעבוד יחד בצורה חלקה.',
    color: 'from-pink-500 to-rose-500',
    glow: 'rgba(236, 72, 153, 0.15)',
  },
]

export default function Services() {
  return (
    <section id="services" className="relative py-24 bg-[#060b14] overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 section-pattern opacity-30 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-blue-600/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-medium uppercase tracking-wider">
            מה אני עושה
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white">
            שירותים שמניעים{' '}
            <span className="gradient-text">תוצאות אמיתיות</span>
          </h2>
          <p className="max-w-2xl mx-auto text-slate-400 text-lg">
            כל שירות מתוכנן עם מטרה אחת ברורה: לעזור לעסק שלכם לצמוח, להתייעל, ולנצח את התחרות.
          </p>
        </div>

        {/* Services grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => {
            const Icon = service.icon
            return (
              <div
                key={service.title}
                className="service-card relative group p-7 rounded-2xl bg-[#0f1a2e] border border-[#1e3a5f]/60 cursor-pointer overflow-hidden"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                {/* Hover glow background */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl pointer-events-none"
                  style={{ background: `radial-gradient(circle at 30% 30%, ${service.glow}, transparent 70%)` }}
                />

                {/* Icon */}
                <div className={`relative w-14 h-14 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-5 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="w-7 h-7 text-white" />
                </div>

                {/* Content */}
                <div className="relative space-y-3">
                  <h3 className="text-xl font-bold text-white group-hover:text-blue-300 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    {service.description}
                  </p>

                  {/* Arrow */}
                  <div className="flex items-center gap-1 text-blue-400 text-sm font-medium opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0">
                    <span>קראו עוד</span>
                    <ArrowLeft className="w-4 h-4" />
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
