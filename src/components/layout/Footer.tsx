import { Code2, Mail, Phone, MapPin, ArrowLeft } from 'lucide-react'

const footerLinks = {
  services: [
    { label: 'פיתוח אתרים', href: '#services' },
    { label: 'חנויות אונליין', href: '#services' },
    { label: 'אוטומציות עסקיות', href: '#services' },
    { label: 'פתרונות AI', href: '#services' },
    { label: 'פיתוח מותאם אישית', href: '#services' },
  ],
  nav: [
    { label: 'תהליך העבודה', href: '#process' },
    { label: 'פרויקטים', href: '#portfolio' },
    { label: 'המלצות', href: '#testimonials' },
    { label: 'שאלות נפוצות', href: '#faq' },
    { label: 'צרו קשר', href: '#contact' },
  ],
}

export default function Footer() {
  return (
    <footer className="bg-[#060b14] border-t border-[#1e3a5f]/40">
      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Brand column */}
          <div className="lg:col-span-1 space-y-5">
            <a href="#" className="flex items-center gap-2 group w-fit">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                <Code2 className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-xl text-white">
                OZ<span className="text-blue-400">.</span>Digital
              </span>
            </a>
            <p className="text-slate-400 text-sm leading-relaxed">
              אני בונה מערכות דיגיטליות שמניעות עסקים קדימה — אתרים, אוטומציות ופתרונות AI מותאמים אישית.
            </p>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 text-sm font-medium transition-colors group"
            >
              <span>בואו נדבר</span>
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            </a>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white font-semibold mb-5">שירותים</h3>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-slate-400 hover:text-blue-400 text-sm transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-white font-semibold mb-5">ניווט</h3>
            <ul className="space-y-3">
              {footerLinks.nav.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-slate-400 hover:text-blue-400 text-sm transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-5">יצירת קשר</h3>
            <ul className="space-y-4">
              <li>
                <a
                  href="mailto:hello@ozdigital.co.il"
                  className="flex items-center gap-3 text-slate-400 hover:text-blue-400 text-sm transition-colors"
                >
                  <Mail className="w-4 h-4 text-blue-500 flex-shrink-0" />
                  hello@ozdigital.co.il
                </a>
              </li>
              <li>
                <a
                  href="tel:+972501234567"
                  className="flex items-center gap-3 text-slate-400 hover:text-blue-400 text-sm transition-colors"
                >
                  <Phone className="w-4 h-4 text-blue-500 flex-shrink-0" />
                  050-123-4567
                </a>
              </li>
              <li className="flex items-center gap-3 text-slate-400 text-sm">
                <MapPin className="w-4 h-4 text-blue-500 flex-shrink-0" />
                ישראל
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-[#1e3a5f]/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-slate-500 text-sm">
            © 2025 OZ Digital Solutions. כל הזכויות שמורות.
          </p>
          <p className="text-slate-600 text-xs">
            עוצב ופותח עם ❤️ בישראל
          </p>
        </div>
      </div>
    </footer>
  )
}
