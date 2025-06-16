/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    turbo: {
      rules: {
        // Disable font optimization in development
        '*.css': ['postcss-loader'],
      },
    },
  },
}

module.exports = nextConfig 