import { useRef, useEffect } from 'react'
import QRCodeLib from 'qrcode'
import { downloadCanvas } from '../lib/download'

function QRCode({ url }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    if (!url) return
    QRCodeLib.toCanvas(canvasRef.current, url, { width: 200, margin: 2 })
  }, [url])

  if (!url) return null

  return (
    <div className="qrcode">
      <canvas ref={canvasRef} className="qrcode__canvas" aria-label={`QR code for ${url}`} />
      <button
        type="button"
        className="qrcode__download"
        onClick={() => downloadCanvas(canvasRef.current, 'profile-qr.png')}
      >
        Download PNG
      </button>
    </div>
  )
}

export default QRCode
