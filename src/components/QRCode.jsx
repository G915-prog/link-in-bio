function QRCode({ url }) {
  return (
    <div className="qrcode">
      <canvas className="qrcode__canvas" aria-label={`QR code for ${url}`} />
    </div>
  )
}

export default QRCode
