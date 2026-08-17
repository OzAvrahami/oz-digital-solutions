import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'OZ Digital Solutions | פתרונות דיגיטליים מתקדמים',
  description: 'בניית אתרים, אוטומציות ופתרונות AI מותאמים אישית לעסקים שרוצים לצמוח מהר יותר ולעבוד חכם יותר.',
  keywords: 'בניית אתרים, פיתוח אפליקציות, אוטומציה עסקית, AI, מסחר אלקטרוני, פתרונות דיגיטליים',
  authors: [{ name: 'OZ Digital Solutions' }],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="he" dir="rtl">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className="font-heebo antialiased">{children}</body>
    </html>
  )
}
