import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  output: 'export',
  basePath: '/portfolio2',          // must match your GitHub repo name exactly
  assetPrefix: '/portfolio2/',
  images: {
    unoptimized: true,             // required for static export
  },
  trailingSlash: true,             // GitHub Pages needs this for clean URLs
}

export default nextConfig