'use client'

import { useState, useEffect } from 'react'
import { Menu, X, Code2 } from 'lucide-react'

const navLinks = [
  { label: 'שירותים', href: '#services' },
  { label: 'תהליך העבודה', href: '#process' },
  { label: 'פרויקטים', href: '#portfolio' },
  { label: 'המלצות', href: '#testimonials' },
  { label: 'שאלות נפוצות', href: '#faq' },
]

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#060b14]/90 backdrop-blur-xl border-b border-[#1e3a5f]/50 shadow-lg shadow-black/20'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-[0_0_30px_rgba(59,130,246,0.3)] group-hover:shadow-[0_0_60px_rgba(59,130,246,0.4)] transition-all duration-300">
              <Code2 className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-xl text-white">
              OZ<span className="text-blue-400">.</span>Digital
            </span>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="px-4 py-2 text-sm font-medium text-slate-300 hover:text-white hover:bg-white/5 rounded-lg transition-all duration-200"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="hidden md:block">
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 text-white text-sm font-semibold hover:from-blue-500 hover:to-cyan-500 transition-all duration-300 shadow-[0_0_30px_rgba(59,130,246,0.3)] hover:shadow-[0_0_60px_rgba(59,130,246,0.4)]"
            >
              בואו נדבר
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-all"
            aria-label={menuOpen ? 'סגור תפריט' : 'פתח תפריט'}
          >
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden transition-all duration-300 overflow-hidden ${
          menuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="bg-[#0d1526]/95 backdrop-blur-xl border-t border-[#1e3a5f]/50 px-4 py-4 space-y-1">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="block px-4 py-3 text-base font-medium text-slate-300 hover:text-white hover:bg-white/5 rounded-lg transition-all"
            >
              {link.label}
            </a>
          ))}
          <div className="pt-2">
            <a
              href="#contact"
              onClick={() => setMenuOpen(false)}
              className="block w-full text-center px-5 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 text-white font-semibold hover:from-blue-500 hover:to-cyan-500 transition-all duration-300"
            >
              בואו נדבר
            </a>
          </div>
        </div>
      </div>
    </header>
  )
}
