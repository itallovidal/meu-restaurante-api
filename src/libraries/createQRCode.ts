export async function createQrCode(id: string) {
  const response = await fetch(
    `https://api.qrserver.com/v1/create-qr-code/?size=500x500&data=https://projeto-alpha-site.vercel.app/${id}`,
  )

  return {
    qrCodeURL: response.url,
    URL: `https://projeto-alpha-site.vercel.app/${id}`,
  }
}
