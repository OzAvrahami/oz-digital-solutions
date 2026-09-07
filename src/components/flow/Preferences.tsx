'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from 'react'
import { flowCopy } from '@/content/flow'
import type { Locale } from '@/lib/i18n'
import Icon from './Icon'

const PreferencesContext = createContext({ paused: false, systemReduced: false, toggleMotion: () => {} })
export const usePreferences = () => useContext(PreferencesContext)

export default function Preferences({ locale, children }: { locale: Locale; children: ReactNode }) {
  const t = flowCopy[locale]
  const pathname = usePathname()
  const [requestedPause, setPaused] = useState(false)
  const [systemReduced, setSystemReduced] = useState(false)
  const paused = requestedPause || systemReduced
  const [contrast, setContrast] = useState(false)
  const [ready, setReady] = useState(false)
  const dialog = useRef<HTMLDialogElement>(null)
  const opener = useRef<HTMLButtonElement>(null)
  const utilities = useRef<HTMLDivElement>(null)
  const backTop = useRef<HTMLButtonElement>(null)
  const previousOverflow = useRef<string | null>(null)

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    const hydrate = () => {
      let saved: { paused?: boolean; highContrast?: boolean } = {}
      try { saved = JSON.parse(localStorage.getItem('oz-accessibility') || '{}') ?? {} } catch {}
      setSystemReduced(media.matches)
      setPaused(saved.paused === true)
      setContrast(saved.highContrast === true)
      setReady(true)
    }
    const frame = requestAnimationFrame(hydrate)
    const onMotion = () => setSystemReduced(media.matches)
    media.addEventListener('change', onMotion)
    window.addEventListener('storage', hydrate)
    return () => { cancelAnimationFrame(frame); media.removeEventListener('change', onMotion); window.removeEventListener('storage', hydrate) }
  }, [])
  useEffect(() => {
    if (!ready) return
    document.documentElement.classList.toggle('motion-paused', paused)
    document.documentElement.classList.toggle('high-contrast', contrast)
    try { localStorage.setItem('oz-accessibility', JSON.stringify({ paused: requestedPause, highContrast: contrast })) } catch {}
  }, [paused, requestedPause, contrast, ready])
  useEffect(() => {
    // Progressive enhancement: without observation, all server-rendered content stays visible.
    if (!('IntersectionObserver' in window)) return
    const observed = new WeakSet<Element>()
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target) }
    }), { threshold: 0.08 })
    const observe = () => document.querySelectorAll('.reveal').forEach(element => {
      if (!observed.has(element)) { observed.add(element); observer.observe(element) }
    })
    document.documentElement.classList.add('motion-ready')
    observe()
    const mutations = new MutationObserver(observe)
    mutations.observe(document.body, { childList: true, subtree: true })
    return () => { observer.disconnect(); mutations.disconnect(); document.documentElement.classList.remove('motion-ready') }
  }, [pathname])
  useEffect(() => {
    const modal = dialog.current
    modal?.close()
    if (previousOverflow.current !== null) { document.body.style.overflow = previousOverflow.current; previousOverflow.current = null }
    let frame = 0
    const update = () => {
      frame = 0
      const group = utilities.current
      if (!group || !backTop.current) return
      backTop.current.hidden = window.scrollY < 500
      group.hidden = false
      const rect = group.getBoundingClientRect()
      const editing = !modal?.open && document.activeElement?.matches('input, textarea, select, [contenteditable="true"]')
      const collision = Array.from(document.querySelectorAll('main a[href], main button, main input, main textarea, footer a[href]')).some(element => {
        const other = element.getBoundingClientRect()
        return other.width > 0 && other.height > 0 && other.left < rect.right + 8 && other.right > rect.left - 8 && other.top < rect.bottom + 8 && other.bottom > rect.top - 8
      })
      group.hidden = Boolean(editing || document.getElementById('mobile-menu') || collision)
    }
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update) }
    const mutations = new MutationObserver(schedule)
    mutations.observe(document.body, { childList: true, subtree: true })
    const resize = new ResizeObserver(schedule)
    resize.observe(document.body)
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    document.addEventListener('focusin', schedule)
    document.addEventListener('focusout', schedule)
    window.visualViewport?.addEventListener('resize', schedule)
    schedule()
    return () => {
      cancelAnimationFrame(frame); mutations.disconnect(); resize.disconnect()
      window.removeEventListener('scroll', schedule); window.removeEventListener('resize', schedule)
      document.removeEventListener('focusin', schedule); document.removeEventListener('focusout', schedule)
      window.visualViewport?.removeEventListener('resize', schedule)
      modal?.close()
      if (previousOverflow.current !== null) { document.body.style.overflow = previousOverflow.current; previousOverflow.current = null }
    }
  }, [pathname])
  const close = () => {
    dialog.current?.close()
    if (previousOverflow.current !== null) { document.body.style.overflow = previousOverflow.current; previousOverflow.current = null }
    if (utilities.current) utilities.current.hidden = false
    opener.current?.focus({ preventScroll: true })
  }
  const toggleMotion = () => setPaused(value => !value)
  return <PreferencesContext.Provider value={{ paused, systemReduced, toggleMotion }}>{children}
    <div className="page-utilities" ref={utilities}>
      <button ref={backTop} className="utility-button back-to-top" type="button" aria-label={t.backTop} hidden onClick={() => {
        const heading = document.querySelector<HTMLElement>('main h1')
        if (heading) { heading.tabIndex = -1; heading.focus({ preventScroll: true }) }
        window.scrollTo({ top: 0, behavior: paused || window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' })
      }}><Icon name="up" /><span className="utility-tooltip" aria-hidden="true">{t.backTop}</span></button>
      <button ref={opener} className="utility-button accessibility-button" type="button" aria-label={t.accessibility} aria-haspopup="dialog" aria-controls="accessibility-dialog" onClick={() => {
        previousOverflow.current = document.body.style.overflow
        document.body.style.overflow = 'hidden'
        dialog.current?.showModal()
      }}><Icon name="accessibility" /><span className="utility-tooltip" aria-hidden="true">{t.accessibility}</span></button>
    </div>
    <dialog ref={dialog} className="accessibility-dialog" id="accessibility-dialog" aria-labelledby="accessibility-title" aria-describedby="accessibility-intro" onCancel={event => { event.preventDefault(); close() }} onClick={event => { if (event.target === dialog.current) { const rect = dialog.current.getBoundingClientRect(); if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) close() } }}>
      <div className="dialog-heading"><span className="dialog-symbol"><Icon name="accessibility" /></span><button className="dialog-close" type="button" aria-label={t.closeAccessibility} onClick={close}><Icon name="close" /></button></div><h2 id="accessibility-title">{t.accessibilityTitle}</h2><p id="accessibility-intro">{t.accessibilityIntro}</p>
      <div className="accessibility-settings"><label className="accessibility-setting"><span><strong>{t.reduceMotion}</strong><small>{systemReduced ? (locale === 'he' ? 'התנועה נעצרה בהתאם להגדרות המכשיר.' : 'Motion is paused by your device preference.') : t.reduceMotionHint}</small></span><input type="checkbox" checked={paused} disabled={systemReduced} onChange={toggleMotion} /></label><label className="accessibility-setting"><span><strong>{t.highContrast}</strong><small>{t.highContrastHint}</small></span><input type="checkbox" checked={contrast} onChange={event => setContrast(event.target.checked)} /></label></div><p className="accessibility-help">{t.accessibilityHelp}</p><div className="accessibility-dialog-footer"><Link href={`/${locale}/accessibility`} onClick={close}>{t.accessibilityStatement}<Icon name="arrow" className="direction-icon" /></Link><button className="preference-reset" type="button" onClick={() => { setPaused(false); setContrast(false) }}>{t.accessibilityReset}</button></div>
    </dialog>
  </PreferencesContext.Provider>
}
