import { ImageResponse } from 'next/og'
import { notFound } from 'next/navigation'

import { getDictionary, getDirection, isLocale } from '@/lib/i18n'

export const alt = 'Oz Avrahami portfolio — Digital Products & Software Systems'
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/png'

const heeboRegularFont = fetch(
  'https://fonts.gstatic.com/s/heebo/v28/NGSpv5_NC0k9P_v6ZUCbLRAHxK1EiSyccg.ttf',
).then((response) => response.arrayBuffer())

const heeboBoldFont = fetch(
  'https://fonts.gstatic.com/s/heebo/v28/NGSpv5_NC0k9P_v6ZUCbLRAHxK1Ebiuccg.ttf',
).then((response) => response.arrayBuffer())

interface OpenGraphImageProps {
  params: Promise<{ locale: string }>
}

export default async function OpenGraphImage({ params }: OpenGraphImageProps) {
  const { locale } = await params

  if (!isLocale(locale)) notFound()

  const dictionary = getDictionary(locale)
  const direction = getDirection(locale)
  const isRtl = direction === 'rtl'
  const [regularFontData, boldFontData] = await Promise.all([
    heeboRegularFont,
    heeboBoldFont,
  ])
  const capabilities = [
    dictionary.capabilityMarquee.websites,
    dictionary.capabilityMarquee.applications,
    dictionary.capabilityMarquee.automation,
    dictionary.capabilityMarquee.ai,
  ]

  return new ImageResponse(
    (
      <div
        dir={direction}
        style={{
          alignItems: 'center',
          backgroundColor: '#0a0b0e',
          backgroundImage:
            'radial-gradient(circle at 78% 28%, rgba(77, 125, 255, 0.24), transparent 32%), linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px)',
          backgroundSize: 'auto, 48px 48px, 48px 48px',
          color: '#f4f5f8',
          display: 'flex',
          direction,
          fontFamily: 'Heebo',
          height: '100%',
          justifyContent: isRtl ? 'flex-end' : 'flex-start',
          padding: '72px 84px',
          textAlign: isRtl ? 'right' : 'left',
          width: '100%',
        }}
      >
        <div
          style={{
            alignItems: isRtl ? 'flex-end' : 'flex-start',
            display: 'flex',
            flexDirection: 'column',
            gap: 32,
            maxWidth: 920,
            width: '100%',
          }}
        >
          <div
            style={{
              alignItems: 'center',
              display: 'flex',
              flexDirection: isRtl ? 'row-reverse' : 'row',
              gap: 16,
            }}
          >
            <div
              style={{
                backgroundColor: '#4d7dff',
                borderRadius: 999,
                boxShadow: '0 0 28px rgba(77, 125, 255, 0.7)',
                display: 'flex',
                height: 15,
                width: 15,
              }}
            />
            <div style={{ display: 'flex', fontSize: 29, fontWeight: 700, letterSpacing: '-0.02em' }}>
              {dictionary.identity.name}
            </div>
          </div>

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              fontSize: 70,
              fontWeight: 700,
              letterSpacing: isRtl ? '-0.025em' : '-0.045em',
              lineHeight: 1.05,
              width: '100%',
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: isRtl ? 'flex-end' : 'flex-start',
              }}
            >
              {dictionary.hero.titleLead}
            </div>
            <div
              style={{
                color: '#7f9dff',
                display: 'flex',
                justifyContent: isRtl ? 'flex-end' : 'flex-start',
              }}
            >
              {dictionary.hero.titleAccent}
            </div>
          </div>

          <div
            style={{
              color: '#9aa0aa',
              display: 'flex',
              flexDirection: isRtl ? 'row-reverse' : 'row',
              fontSize: 24,
              gap: 10,
              letterSpacing: '0.01em',
            }}
          >
            {capabilities.map((capability, index) => (
              <div
                key={capability}
                style={{
                  display: 'flex',
                  flexDirection: isRtl ? 'row-reverse' : 'row',
                  gap: 10,
                }}
              >
                <span>{capability}</span>
                {index < capabilities.length - 1 ? <span>·</span> : null}
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: 'Heebo',
          data: regularFontData,
          weight: 400,
        },
        {
          name: 'Heebo',
          data: boldFontData,
          weight: 700,
        },
      ],
    },
  )
}
