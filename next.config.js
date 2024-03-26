/** @type {import('next').NextConfig} */

module.exports = {
  images: {
    remotePatterns: [{
      protocol: 'https',
      hostname: 'res.cloudinary.com',
    }]
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Frame-Ancestors',
            value: "'https://giscus.app/'",
          },
        ],
      },
    ]
  },
}
