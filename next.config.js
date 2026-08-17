/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: '/',
        destination: '/he',
        permanent: false,
      },
    ]
  },
}

module.exports = nextConfig
