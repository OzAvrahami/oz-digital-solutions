import { Fragment } from 'react'

/** Only the approved copy's line breaks and emphasis are supported; no HTML injection. */
export default function DesignText({ children }: { children: string }) {
  return <>{children.split(/(<span(?: class="hero-accent")?>.*?<\/span>|<br(?: class="hero-break")?>)/g).map((part, index) => {
    if (part.startsWith('<br')) return <br key={index} className={part.includes('hero-break') ? 'hero-break' : undefined} />
    if (part.startsWith('<span')) return <span key={index} className={part.includes('hero-accent') ? 'hero-accent' : undefined}>{part.replace(/<[^>]+>/g, '')}</span>
    return <Fragment key={index}>{part}</Fragment>
  })}</>
}
