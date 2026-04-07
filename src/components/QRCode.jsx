import { useRef, useEffect } from 'react'
import QRCodeLib from 'qrcode'

function QRCode({ url }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    if (!url) return
    QRCodeLib.toCanvas(canvasRef.current, url, { width: 200, margin: 2 })
  }, [url])

  if (!url) return null

  function handleDownload() {
    const link = document.createElement('a')
    link.download = 'profile-qr.png'
    link.href = canvasRef.current.toDataURL('image/png')
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div className="qrcode">
      <canvas ref={canvasRef} className="qrcode__canvas" aria-label={`QR code for ${url}`} />
      <button type="button" className="qrcode__download" onClick={handleDownload}>
        Download PNG
      </button>
    </div>
  )
}

export default QRCode
