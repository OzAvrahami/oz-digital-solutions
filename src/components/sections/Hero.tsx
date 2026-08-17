'use client'

import { ArrowLeft, Sparkles, CheckCircle } from 'lucide-react'

const stats = [
  { number: '50+', label: 'פרויקטים הושלמו' },
  { number: '30+', label: 'לקוחות מרוצים' },
  { number: '5+', label: 'שנות ניסיון' },
  { number: '100%', label: 'מחויבות לתוצאות' },
]

const highlights = [
  'אתרים שממירים מבקרים ללקוחות',
  'אוטומציות שחוסכות עשרות שעות',
  'AI שעובד בשביל העסק שלכם',
]

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#060b14]">
      {/* Background gradient blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-blue-600/10 rounded-full blur-[120px]" />
        <div className="absolute top-1/3 right-0 w-[400px] h-[400px] bg-cyan-600/8 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-blue-800/10 rounded-full blur-[100px]" />
      </div>

      {/* Dot grid pattern */}
      <div
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(59, 130, 246, 0.3) 1px, transparent 0)',
          backgroundSize: '40px 40px',
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20">
        <div className="text-center space-y-8">

          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <Sparkles className="w-4 h-4" />
            <span>זמין לפרויקטים חדשים</span>
          </div>

          {/* Main headline */}
          <div className="space-y-2">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-[1.1] tracking-tight text-white">
              אני בונה
              <span className="block">
                <span className="gradient-text">מערכות דיגיטליות</span>
              </span>
              שמניעות עסקים קדימה
            </h1>
          </div>

          {/* Subheadline */}
          <p className="max-w-2xl mx-auto text-lg sm:text-xl text-slate-400 leading-relaxed font-light">
            אתרים, אוטומציות ופתרונות AI מותאמים אישית — לעסקים שרוצים לצמוח מהר יותר, לעבוד חכם יותר, ולהשאיר את המתחרים מאחור.
          </p>

          {/* Highlights */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8">
            {highlights.map((item) => (
              <div key={item} className="flex items-center gap-2 text-slate-300 text-sm">
                <CheckCircle className="w-4 h-4 text-blue-400 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#contact"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-blue-600 to-blue-500 text-white text-base font-bold hover:from-blue-500 hover:to-cyan-500 transition-all duration-300 shadow-[0_0_30px_rgba(59,130,246,0.4)] hover:shadow-[0_0_50px_rgba(59,130,246,0.6)] hover:-translate-y-0.5 group"
            >
              <span>קבעו שיחת גילוי חינם</span>
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            </a>
            <a
              href="#portfolio"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-white/5 border border-white/10 text-white text-base font-semibold hover:bg-white/10 hover:border-blue-500/40 transition-all duration-300"
            >
              <span>צפו בפרויקטים שלי</span>
            </a>
          </div>

          {/* Stats */}
          <div className="pt-8 grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-3xl mx-auto">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center space-y-1">
                <div className="text-3xl sm:text-4xl font-black gradient-text">{stat.number}</div>
                <div className="text-xs sm:text-sm text-slate-500">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#060b14] to-transparent pointer-events-none" />
    </section>
  )
}
