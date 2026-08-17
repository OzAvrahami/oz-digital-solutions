'use client'

import { useState } from 'react'
import { Mail, Phone, MessageCircle, Send, Clock, CheckCircle } from 'lucide-react'

const projectTypes = [
  'אתר תדמית',
  'חנות אונליין',
  'אוטומציה עסקית',
  'פתרון AI',
  'מערכת מותאמת',
  'אחר',
]

export default function Contact() {
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    projectType: '',
    message: '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <section id="contact" className="relative py-24 bg-[#060b14] overflow-hidden">
      {/* Background */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-blue-600/8 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute inset-0 section-pattern opacity-15 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-medium uppercase tracking-wider">
            בואו נדבר
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white">
            מוכנים לקחת את העסק שלכם{' '}
            <span className="gradient-text">לשלב הבא?</span>
          </h2>
          <p className="max-w-2xl mx-auto text-slate-400 text-lg">
            שיחת גילוי חינם של 30 דקות — בלי התחייבות. תצאו עם בהירות מלאה על הדרך קדימה.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 max-w-6xl mx-auto">

          {/* Contact Form */}
          <div className="p-8 rounded-3xl bg-[#0f1a2e] border border-[#1e3a5f]/60">
            {submitted ? (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-4 py-12">
                <div className="w-16 h-16 rounded-2xl bg-green-500/20 border border-green-500/30 flex items-center justify-center">
                  <CheckCircle className="w-8 h-8 text-green-400" />
                </div>
                <h3 className="text-2xl font-bold text-white">הפנייה התקבלה!</h3>
                <p className="text-slate-400">
                  תודה שפניתם. אחזור אליכם תוך 24 שעות לתיאום שיחת הגילוי.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <h3 className="text-xl font-bold text-white mb-6">שלחו לי הודעה</h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-300">שם מלא *</label>
                    <input
                      type="text"
                      required
                      placeholder="ישראל ישראלי"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="form-input w-full px-4 py-3 rounded-xl text-sm"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-300">אימייל *</label>
                    <input
                      type="email"
                      required
                      placeholder="hello@example.com"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="form-input w-full px-4 py-3 rounded-xl text-sm"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-300">טלפון</label>
                    <input
                      type="tel"
                      placeholder="050-000-0000"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      className="form-input w-full px-4 py-3 rounded-xl text-sm"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-300">סוג פרויקט</label>
                    <select
                      value={form.projectType}
                      onChange={(e) => setForm({ ...form, projectType: e.target.value })}
                      className="form-input w-full px-4 py-3 rounded-xl text-sm appearance-none"
                    >
                      <option value="">בחרו סוג פרויקט...</option>
                      {projectTypes.map((t) => (
                        <option key={t} value={t}>{t}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-300">ספרו לי על הפרויקט *</label>
                  <textarea
                    required
                    rows={4}
                    placeholder="מה רוצים לבנות? מה המטרה? אתם מוזמנים לפרט..."
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="form-input w-full px-4 py-3 rounded-xl text-sm resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-3 px-6 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 text-white font-bold text-base hover:from-blue-500 hover:to-cyan-500 transition-all duration-300 shadow-[0_0_30px_rgba(59,130,246,0.3)] hover:shadow-[0_0_60px_rgba(59,130,246,0.4)]"
                >
                  <Send className="w-5 h-5" />
                  <span>שלחו את הפנייה</span>
                </button>
              </form>
            )}
          </div>

          {/* Contact info */}
          <div className="space-y-6">

            {/* Availability card */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-blue-600/20 to-cyan-600/10 border border-blue-500/20">
              <div className="flex items-center gap-3 mb-3">
                <span className="w-3 h-3 rounded-full bg-green-400 animate-pulse" />
                <span className="text-green-400 font-semibold text-sm">זמין לפרויקטים חדשים</span>
              </div>
              <p className="text-slate-300 text-sm leading-relaxed">
                כרגע אני מקבל פרויקטים חדשים. מקומות מוגבלים — אם הפרויקט שלכם מתאים, כדאי לפנות עכשיו.
              </p>
            </div>

            {/* Contact options */}
            <div className="space-y-4">
              <a
                href="mailto:hello@ozdigital.co.il"
                className="flex items-center gap-4 p-5 rounded-2xl bg-[#0f1a2e] border border-[#1e3a5f]/60 hover:border-blue-500/30 transition-all group"
              >
                <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center group-hover:bg-blue-500/20 transition-colors">
                  <Mail className="w-6 h-6 text-blue-400" />
                </div>
                <div>
                  <div className="text-xs text-slate-500 mb-0.5">אימייל</div>
                  <div className="text-white font-medium text-sm">hello@ozdigital.co.il</div>
                </div>
              </a>

              <a
                href="tel:+972501234567"
                className="flex items-center gap-4 p-5 rounded-2xl bg-[#0f1a2e] border border-[#1e3a5f]/60 hover:border-blue-500/30 transition-all group"
              >
                <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center group-hover:bg-blue-500/20 transition-colors">
                  <Phone className="w-6 h-6 text-blue-400" />
                </div>
                <div>
                  <div className="text-xs text-slate-500 mb-0.5">טלפון</div>
                  <div className="text-white font-medium text-sm">050-123-4567</div>
                </div>
              </a>

              <a
                href="https://wa.me/972501234567"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-5 rounded-2xl bg-green-500/10 border border-green-500/20 hover:border-green-400/40 transition-all group"
              >
                <div className="w-12 h-12 rounded-xl bg-green-500/20 border border-green-500/30 flex items-center justify-center group-hover:bg-green-500/30 transition-colors">
                  <MessageCircle className="w-6 h-6 text-green-400" />
                </div>
                <div className="flex-1">
                  <div className="text-xs text-slate-500 mb-0.5">WhatsApp</div>
                  <div className="text-white font-medium text-sm">שלחו הודעה מהירה</div>
                </div>
                <span className="text-green-400 text-xs font-medium bg-green-500/10 px-2.5 py-1 rounded-lg">זמין</span>
              </a>
            </div>

            {/* Response time */}
            <div className="flex items-center gap-3 p-4 rounded-xl bg-[#0f1a2e] border border-[#1e3a5f]/40">
              <Clock className="w-5 h-5 text-blue-400 flex-shrink-0" />
              <p className="text-slate-400 text-sm">
                <span className="text-white font-medium">זמן מענה: </span>
                בדרך כלל תוך 2-4 שעות בימי עבודה
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
