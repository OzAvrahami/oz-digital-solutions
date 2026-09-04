'use client'

import Script from 'next/script'
import { usePathname } from 'next/navigation'
import { useEffect, useRef } from 'react'

import { trackPageView } from '@/lib/analytics'

interface GoogleAnalyticsProps {
  measurementId: string | null
}

export default function GoogleAnalytics({ measurementId }: GoogleAnalyticsProps) {
  const pathname = usePathname()
  const isInitialPage = useRef(true)

  useEffect(() => {
    if (isInitialPage.current) {
      isInitialPage.current = false
      return
    }

    trackPageView()
  }, [pathname])

  if (process.env.NODE_ENV !== 'production' || !measurementId) return null

  const serializedMeasurementId = JSON.stringify(measurementId)

  return (
    <>
      <Script id="ga4-initialization" strategy="afterInteractive">
        {`
          if (!['localhost', '127.0.0.1', '::1'].includes(window.location.hostname)) {
            window.dataLayer = window.dataLayer || [];
            window.gtag = function(){window.dataLayer.push(arguments);};
            window.gtag('js', new Date());
            window.gtag('config', ${serializedMeasurementId}, { send_page_view: false });
            window.gtag('event', 'page_view', {
              page_path: window.location.pathname + window.location.search,
              page_location: window.location.href,
              page_title: document.title
            });
          }
        `}
      </Script>
      <Script
        id="ga4-library"
        src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
        strategy="afterInteractive"
      />
    </>
  )
}
