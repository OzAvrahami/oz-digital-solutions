'use client'

import { usePathname } from 'next/navigation'
import { useEffect, useRef } from 'react'

import { siteConfig } from '@/config/site'
import { trackWhatsAppClick } from '@/lib/analytics'
import type { Locale } from '@/lib/i18n'
import { getWhatsAppHref, whatsappCopy } from '@/lib/whatsapp'

import styles from './whatsapp.module.css'

function WhatsAppIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false">
      <path d="M20.52 3.48A11.9 11.9 0 0 0 12.05 0C5.46 0 .1 5.36.1 11.95c0 2.1.55 4.16 1.6 5.97L0 24l6.24-1.64a11.94 11.94 0 0 0 5.8 1.48h.01c6.59 0 11.95-5.36 11.95-11.95 0-3.19-1.24-6.19-3.48-8.41ZM12.05 21.82a9.9 9.9 0 0 1-5.05-1.38l-.36-.21-3.7.97.99-3.61-.24-.37a9.9 9.9 0 0 1-1.52-5.27c0-5.46 4.44-9.9 9.9-9.9a9.84 9.84 0 0 1 7 2.9 9.84 9.84 0 0 1 2.9 7c0 5.45-4.44 9.89-9.92 9.87Zm5.43-7.4c-.3-.15-1.77-.87-2.04-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.95 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.18-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.18.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.49s1.07 2.89 1.22 3.09c.15.2 2.11 3.22 5.11 4.51.71.31 1.27.49 1.7.62.72.23 1.38.2 1.9.12.58-.09 1.77-.72 2.02-1.42.25-.7.25-1.29.17-1.42-.07-.12-.27-.2-.57-.35Z" />
    </svg>
  )
}

export default function WhatsAppAction({ locale, placement = 'contact' }: {
  locale: Locale
  placement?: 'contact' | 'floating'
}) {
  const pathname = usePathname()
  const href = getWhatsAppHref(siteConfig.whatsappNumber, locale)
  if (!href) return null

  return <WhatsAppLink key={`${pathname}:${placement}`} locale={locale} placement={placement} href={href} />
}

function WhatsAppLink({ locale, placement, href }: {
  locale: Locale
  placement: 'contact' | 'floating'
  href: string
}) {
  const linkRef = useRef<HTMLAnchorElement>(null)

  useEffect(() => {
    const link = linkRef.current
    if (placement !== 'floating' || !link) return

    let frame = 0
    const updateVisibility = () => {
      frame = 0
      const viewport = window.visualViewport
      const top = viewport?.offsetTop ?? 0
      const bottom = top + (viewport?.height ?? window.innerHeight)
      const contact = document.getElementById('contact')?.getBoundingClientRect()
      const inline = document.querySelector('[data-whatsapp-contact]')?.getBoundingClientRect()
      const isVisible = (rect: DOMRect | undefined) => rect && rect.bottom > top && rect.top < bottom
      const editing = document.activeElement?.matches('input, textarea, select, [contenteditable="true"]')

      // Protect the entire contact form, including when the inline link has scrolled offscreen.
      if (document.getElementById('mobile-menu') || document.querySelector('dialog[open]') || isVisible(contact) || isVisible(inline) || editing) {
        link.hidden = true
        return
      }

      // Measure at its fixed position before painting; suppress it if it would cover a control.
      link.hidden = false
      const floating = link.getBoundingClientRect()
      link.hidden = Array.from(document.querySelectorAll('main a[href], main button, footer a[href]')).some((control) => {
        const rect = control.getBoundingClientRect()
        return rect.width > 0 && rect.height > 0
          && rect.left < floating.right + 8 && rect.right > floating.left - 8
          && rect.top < floating.bottom + 8 && rect.bottom > floating.top - 8
      })
    }
    const scheduleUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(updateVisibility)
    }

    // Child changes include streamed route content and opening/closing the mobile menu.
    const mutations = new MutationObserver(scheduleUpdate)
    mutations.observe(document.body, { childList: true, subtree: true, attributes: true, attributeFilter: ['open'] })
    const resize = new ResizeObserver(scheduleUpdate)
    resize.observe(document.body)
    window.addEventListener('scroll', scheduleUpdate, { passive: true })
    window.addEventListener('resize', scheduleUpdate)
    document.addEventListener('focusin', scheduleUpdate)
    document.addEventListener('focusout', scheduleUpdate)
    window.visualViewport?.addEventListener('resize', scheduleUpdate)
    window.visualViewport?.addEventListener('scroll', scheduleUpdate)
    scheduleUpdate()

    return () => {
      window.cancelAnimationFrame(frame)
      mutations.disconnect()
      resize.disconnect()
      window.removeEventListener('scroll', scheduleUpdate)
      window.removeEventListener('resize', scheduleUpdate)
      document.removeEventListener('focusin', scheduleUpdate)
      document.removeEventListener('focusout', scheduleUpdate)
      window.visualViewport?.removeEventListener('resize', scheduleUpdate)
      window.visualViewport?.removeEventListener('scroll', scheduleUpdate)
    }
  }, [placement])

  return (
    <a
      ref={linkRef}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={whatsappCopy[locale].label}
      className={`${styles.action} ${styles[placement]}`}
      data-whatsapp-contact={placement === 'contact' ? '' : undefined}
      data-whatsapp-placement={placement}
      hidden={placement === 'floating'}
      onClick={() => trackWhatsAppClick(locale, placement)}
    >
      <WhatsAppIcon />
      <span className={styles.label}>{whatsappCopy[locale].label}</span>
    </a>
  )
}
