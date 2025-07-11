/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
await import('./src/env.mjs')

/** @type {import('next').NextConfig} */
const nextConfig = {
  i18n: {
    locales: ['en'],
    defaultLocale: 'en'
  },
  images: {
    remotePatterns: [
      {
        hostname: 'storage.googleapis.com',
        protocol: 'https'
      },
      {
        hostname: 'firebasestorage.googleapis.com',
        protocol: 'https'
      }
    ]
  }
}

export default nextConfig
