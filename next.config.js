/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: { globalNotFound: true },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/he',
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig
