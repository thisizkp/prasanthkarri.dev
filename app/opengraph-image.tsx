import { ImageResponse } from 'next/og'

export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          height: '100%',
          background: 'linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)',
          color: '#fafafa',
          position: 'relative',
        }}
      >
        <div style={{ fontSize: 64, fontWeight: 700, marginBottom: 16 }}>
          Prasanth Karri
        </div>
        <div style={{ fontSize: 28, color: '#c4b5fd' }}>
          Systems, math, and whatever pulls me.
        </div>
        <div style={{ position: 'absolute', bottom: 40, left: 80, fontSize: 20, color: '#a78bfa' }}>
          prasanthkarri.dev
        </div>
      </div>
    ),
    { ...size }
  )
}
