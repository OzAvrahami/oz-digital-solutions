const shapes = {
  up: <><path d="M12 20V4m-6 6 6-6 6 6"/></>,
  accessibility: <><circle cx="12" cy="4" r="2"/><path d="M4 8h16m-8 0v6m0 0-5 7m5-7 5 7"/></>,
  arrow: <><path d="M19 12H5m6-6-6 6 6 6"/></>,
  diagonal: <><path d="M17 7H7v10M7 7l10 10"/></>,
  down: <><path d="M12 4v16m-6-6 6 6 6-6"/></>,
  globe: <><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a17 17 0 0 1 0 18 17 17 0 0 1 0-18"/></>,
  bolt: <><path d="m13 2-9 12h7l-1 8 10-12h-7l1-8Z"/></>,
  layers: <><path d="m12 3 10 5-10 5L2 8l10-5Zm-9 10 9 5 9-5M3 18l9 5 9-5"/></>,
  spark: <><path d="m12 3 2.4 6.6L21 12l-6.6 2.4L12 21l-2.4-6.6L3 12l6.6-2.4L12 3ZM20 2v4m-2-2h4"/></>,
  app: <><rect x="5" y="2" width="14" height="20" rx="3"/><path d="M10 18h4M9 5h6"/></>,
  inbox: <><path d="M4 4h16l2 12v4H2v-4L4 4Z"/><path d="M2 15h5l2 3h6l2-3h5M8 8h8M8 11h5"/></>,
  check: <><path d="m5 12 4 4L19 6"/></>,
  circleCheck: <><circle cx="12" cy="12" r="9"/><path d="m8 12 3 3 5-6"/></>,
  mail: <><rect x="3" y="5" width="18" height="14" rx="3"/><path d="m3 6 9 7 9-7"/></>,
  play: <><path d="m8 5 11 7-11 7V5Z"/></>,
  pause: <><path d="M9 5v14M15 5v14"/></>,
  plus: <><path d="M12 5v14M5 12h14"/></>,
  menu: <><path d="M5 8h14M5 16h14"/></>,
  close: <><path d="m6 6 12 12M6 18 18 6"/></>,
  user: <><circle cx="12" cy="8" r="4"/><path d="M4 21v-2a8 8 0 0 1 16 0v2"/></>,
  hand: <><path d="m3 12 4-7 5 2 5-2 4 7-8 7-3-1-2-2-2-1-3-3Z"/><path d="m7 5 4 4 3-1 5 5m-8-4-4 4 3 2 3-3"/></>,
  message: <><path d="M21 11a8 8 0 0 1-8 8H7l-5 3 2-6a8 8 0 1 1 17-5Z"/><path d="M8 10h8M8 14h5"/></>,
  link: <><path d="m9 15 6-6M8 17l-1 1a4 4 0 0 1-6-6l5-5a4 4 0 0 1 6 0M16 7l1-1a4 4 0 0 1 6 6l-5 5a4 4 0 0 1-6 0"/></>,
  linkedin: <><rect x="3" y="3" width="18" height="18" rx="3"/><path d="M7 10v7M7 7v.1M11 17v-7m0 3c0-4 6-4 6 0v4"/></>,
  cursor: <><path d="m4 3 16 9-8 2-3 7L4 3Z"/></>,
  shield: <><path d="m12 3 8 3v6c0 5-8 9-8 9S4 17 4 12V6l8-3Z"/><path d="m8 12 3 3 5-6"/></>,
}

export default function Icon({ name, className = '' }: { name: string; className?: string }) {
  return <svg className={`icon ${className}`} viewBox="0 0 24 24" aria-hidden="true">{shapes[name as keyof typeof shapes] ?? shapes.spark}</svg>
}
