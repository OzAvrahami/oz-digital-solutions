import { Star, Quote } from 'lucide-react'

const testimonials = [
  {
    text: 'עבדנו עם מספר מפתחים לפני OZ Digital ואף אחד לא הבין את הצרכים שלנו כמו שהוא הבין. האתר לא רק נראה מדהים — הוא ממיר פי שלושה מהאתר הקודם שלנו. ממליץ בחום!',
    name: 'דוד כהן',
    title: 'מנכ"ל, חברת ניהול נכסים',
    initials: 'דכ',
    gradient: 'from-blue-500 to-cyan-500',
    rating: 5,
  },
  {
    text: 'הפעלנו אוטומציה שחסכה לנו 25 שעות עבודה בשבוע. מה שהיה דורש צוות שלם עכשיו עובד אוטומטית. ה-ROI היה ברור כבר בחודש הראשון.',
    name: 'מיכל לוי',
    title: 'מנהלת שיווק, סוכנות דיגיטל',
    initials: 'מל',
    gradient: 'from-violet-500 to-purple-500',
    rating: 5,
  },
  {
    text: 'הצ\'אטבוט שפותח לנו שינה לחלוטין את שירות הלקוחות שלנו. 60% מהפניות מטופלות אוטומטית, הצוות מתמקד בדברים החשובים, והלקוחות מרוצים יותר.',
    name: 'יוסי אברהם',
    title: 'בעלים, רשת חנויות',
    initials: 'יא',
    gradient: 'from-amber-500 to-orange-500',
    rating: 5,
  },
]

export default function Testimonials() {
  return (
    <section id="testimonials" className="relative py-24 bg-[#060b14] overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 section-pattern opacity-20 pointer-events-none" />
      <div className="absolute top-1/2 right-0 w-[400px] h-[400px] bg-violet-600/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-medium uppercase tracking-wider">
            לקוחות מספרים
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white">
            תוצאות שלקוחות{' '}
            <span className="gradient-text">מרגישים בפועל</span>
          </h2>
          <p className="max-w-2xl mx-auto text-slate-400 text-lg">
            לא רק מילים יפות — תוצאות עסקיות מדידות ולקוחות שממליצים.
          </p>
        </div>

        {/* Stars overview */}
        <div className="flex items-center justify-center gap-2 mb-10">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="w-6 h-6 text-amber-400 fill-amber-400" />
          ))}
          <span className="text-white font-bold text-lg mr-2">5.0</span>
          <span className="text-slate-400 text-sm">• מבוסס על משוב לקוחות</span>
        </div>

        {/* Testimonials grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="testimonial-card relative p-7 rounded-2xl bg-[#0f1a2e] border border-[#1e3a5f]/60 flex flex-col space-y-5"
            >
              {/* Quote icon */}
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
                <Quote className="w-5 h-5 text-blue-400" />
              </div>

              {/* Rating */}
              <div className="flex gap-1">
                {[...Array(t.rating)].map((_, j) => (
                  <Star key={j} className="w-4 h-4 text-amber-400 fill-amber-400" />
                ))}
              </div>

              {/* Text */}
              <p className="text-slate-300 text-sm leading-relaxed flex-1">
                &ldquo;{t.text}&rdquo;
              </p>

              {/* Client */}
              <div className="flex items-center gap-3 pt-2 border-t border-[#1e3a5f]/40">
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${t.gradient} flex items-center justify-center flex-shrink-0`}>
                  <span className="text-white text-xs font-bold">{t.initials}</span>
                </div>
                <div>
                  <div className="text-white font-semibold text-sm">{t.name}</div>
                  <div className="text-slate-500 text-xs">{t.title}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
