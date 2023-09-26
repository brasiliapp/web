/** @type {import('next').NextConfig} */
const nextConfig = {images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'brasiliapp.com.br',
        port: '',
      },
      {
        protocol: 'https',
        hostname: 'camara.leg.br.br',
        port: '',
      },
    ],
  },}

module.exports = nextConfig
