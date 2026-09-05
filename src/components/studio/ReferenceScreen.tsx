'use client'

import { useEffect, useRef, type CSSProperties } from 'react'

interface ReferenceScreenProps {
  name: string
  title: string
  width?: number
  height?: number
  eager?: boolean
}

/** Passive, isolated copy of the supplied product design at its original size. */
export default function ReferenceScreen({ name, title, width = 1440, height = 960, eager = false }: ReferenceScreenProps) {
  const container = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const element = container.current
    if (!element) return
    const fit = () => {
      element.style.setProperty('--screen-scale', String(element.clientWidth / width))
      element.dataset.ready = 'true'
    }
    fit()
    const observer = new ResizeObserver(fit)
    observer.observe(element)
    return () => observer.disconnect()
  }, [width])
  return <div ref={container} className="studio-screen" data-screen-width={width} style={{ aspectRatio: `${width} / ${height}` } as CSSProperties}>
    <iframe src={`/project-previews/${name}.html`} title={title} width={width} height={height} loading={eager ? 'eager' : 'lazy'} sandbox="" tabIndex={-1} />
  </div>
}
