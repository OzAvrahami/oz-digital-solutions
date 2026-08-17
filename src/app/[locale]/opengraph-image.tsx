import { ImageResponse } from 'next/og'

export const alt = 'Oz Avrahami portfolio — Digital Products & Software Systems'
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/png'

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          alignItems: 'center',
          backgroundColor: '#0a0b0e',
          backgroundImage:
            'radial-gradient(circle at 78% 28%, rgba(77, 125, 255, 0.24), transparent 32%), linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px)',
          backgroundSize: 'auto, 48px 48px, 48px 48px',
          color: '#f4f5f8',
          display: 'flex',
          fontFamily: 'Arial, sans-serif',
          height: '100%',
          padding: '72px 84px',
          width: '100%',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 32,
            maxWidth: 920,
          }}
        >
          <div style={{ alignItems: 'center', display: 'flex', gap: 16 }}>
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
              Oz Avrahami
            </div>
          </div>

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              fontSize: 70,
              fontWeight: 700,
              letterSpacing: '-0.045em',
              lineHeight: 1.05,
            }}
          >
            <div style={{ display: 'flex' }}>Digital products.</div>
            <div style={{ color: '#7f9dff', display: 'flex' }}>Software systems.</div>
            <div style={{ display: 'flex' }}>Built around your business.</div>
          </div>

          <div
            style={{
              color: '#9aa0aa',
              display: 'flex',
              fontSize: 24,
              letterSpacing: '0.01em',
            }}
          >
            Websites · Applications · Automation · AI
          </div>
        </div>
      </div>
    ),
    size,
  )
}
