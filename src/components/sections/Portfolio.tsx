'use client'

import { useState } from 'react'
import { ExternalLink, Code2 } from 'lucide-react'

const categories = ['הכל', 'אתרים', 'חנויות', 'אוטומציות', 'AI']

const projects = [
  {
    title: 'פלטפורמת ניהול נכסים',
    category: 'אתרים',
    description: 'מערכת ניהול נכסים לחברת נדל"ן — לוח בקרה מלא, ניהול לקוחות, חוזים ותשלומים.',
    tags: ['Next.js', 'TypeScript', 'PostgreSQL'],
    gradient: 'from-blue-600 to-blue-900',
    color: '#3b82f6',
    icon: '🏢',
  },
  {
    title: 'חנות אופנה פרימיום',
    category: 'חנויות',
    description: 'חנות אי-קומרס לחברת אופנה — קטלוג מוצרים, מועדון לקוחות, ואינטגרציה עם מערכת המלאי.',
    tags: ['Shopify', 'React', 'Liquid'],
    gradient: 'from-violet-600 to-purple-900',
    color: '#8b5cf6',
    icon: '👗',
  },
  {
    title: 'מערכת אוטומציה לסוכנות',
    category: 'אוטומציות',
    description: 'אוטומציה מלאה של תהליך הכנסת לידים, שליחת הצעות מחיר ומעקב לקוחות — חיסכון של 20 שעות בשבוע.',
    tags: ['Make.com', 'Zapier', 'CRM API'],
    gradient: 'from-amber-600 to-orange-900',
    color: '#f59e0b',
    icon: '⚡',
  },
  {
    title: 'צ\'אטבוט AI לשירות לקוחות',
    category: 'AI',
    description: 'צ\'אטבוט AI חכם שמשיב על שאלות לקוחות, מנתב פניות, ומצמצם עומס על הצוות ב-60%.',
    tags: ['OpenAI API', 'Node.js', 'WhatsApp'],
    gradient: 'from-cyan-600 to-teal-900',
    color: '#06b6d4',
    icon: '🤖',
  },
  {
    title: 'אתר מרפאת שיניים',
    category: 'אתרים',
    description: 'אתר מקצועי עם מערכת קביעת תורים אונליין, גלריית לפני/אחרי, וחיבור לגוגל קלנדר.',
    tags: ['Next.js', 'Calendly', 'CMS'],
    gradient: 'from-emerald-600 to-green-900',
    color: '#10b981',
    icon: '🦷',
  },
  {
    title: 'מנוע המלצות AI',
    category: 'AI',
    description: 'מנוע המלצות חכם לחנות אונליין שמגדיל את ה-AOV בממוצע ב-35% באמצעות פרסונליזציה.',
    tags: ['Python', 'ML', 'React'],
    gradient: 'from-pink-600 to-rose-900',
    color: '#ec4899',
    icon: '✨',
  },
]

export default function Portfolio() {
  const [activeFilter, setActiveFilter] = useState('הכל')

  const filtered = activeFilter === 'הכל'
    ? projects
    : projects.filter((p) => p.category === activeFilter)

  return (
    <section id="portfolio" className="relative py-24 bg-[#0d1526] overflow-hidden">
      {/* Background */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-blue-600/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-medium uppercase tracking-wider">
            פרויקטים
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white">
            עבודות שמדברות{' '}
            <span className="gradient-text">בעד עצמן</span>
          </h2>
          <p className="max-w-2xl mx-auto text-slate-400 text-lg">
            מבחר פרויקטים שפותחו עבור לקוחות מתחומים שונים — כל אחד עם מטרה, פתרון, ותוצאה ברורים.
          </p>
        </div>

        {/* Filter tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`px-5 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                activeFilter === cat
                  ? 'bg-blue-600 text-white shadow-[0_0_30px_rgba(59,130,246,0.3)]'
                  : 'bg-[#0f1a2e] border border-[#1e3a5f]/60 text-slate-400 hover:text-white hover:border-blue-500/40'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Projects grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((project) => (
            <div
              key={project.title}
              className="portfolio-card group relative rounded-2xl overflow-hidden bg-[#0f1a2e] border border-[#1e3a5f]/60 hover:border-blue-500/30 transition-all duration-300 cursor-pointer hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(0,0,0,0.4)]"
            >
              {/* Header gradient */}
              <div className={`relative h-44 bg-gradient-to-br ${project.gradient} flex items-center justify-center overflow-hidden`}>
                <div className="text-6xl" aria-hidden="true">{project.icon}</div>
                <div className="absolute inset-0 bg-black/20" />

                {/* Hover overlay */}
                <div className="overlay absolute inset-0 bg-black/70 flex items-center justify-center">
                  <div className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white text-gray-900 font-semibold text-sm">
                    <ExternalLink className="w-4 h-4" />
                    <span>צפייה בפרויקט</span>
                  </div>
                </div>

                {/* Category badge */}
                <div
                  className="absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-semibold text-white"
                  style={{ backgroundColor: `${project.color}50`, border: `1px solid ${project.color}60` }}
                >
                  {project.category}
                </div>
              </div>

              {/* Content */}
              <div className="p-6 space-y-3">
                <h3 className="text-lg font-bold text-white group-hover:text-blue-300 transition-colors">
                  {project.title}
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  {project.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 pt-1">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 rounded-lg bg-[#1e3a5f]/60 text-slate-400 text-xs font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/5 border border-white/10 text-white font-medium hover:bg-white/10 hover:border-blue-500/40 transition-all"
          >
            <Code2 className="w-5 h-5 text-blue-400" />
            <span>רוצים לראות עוד? בואו נדבר על הפרויקט שלכם</span>
          </a>
        </div>
      </div>
    </section>
  )
}
