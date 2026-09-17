import { connection } from 'next/server'
import localFont from 'next/font/local'
import NotFoundDocument from '@/components/NotFoundDocument'

import '../components/flow/flow.css'
import '../components/flow/accessibility.css'
import './not-found.css'

const heebo = localFont({
  src: '../../public/oz-digital/heebo.ttf',
  weight: '100 900',
  variable: '--font-heebo',
  display: 'swap',
})

export default async function GlobalNotFound() {
  // Only the 404 is request-rendered so usePathname has the requested URL in
  // its initial HTML. A static /_not-found document would lose that locale.
  await connection()
  return <NotFoundDocument fontClassName={heebo.variable} />
}
