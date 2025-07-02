/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  experimental: {
    // Add this to handle Suspense issues
    missingSuspenseWithCSRBailout: false,
  },
  // For production builds
  output: 'standalone',
}

export default nextConfig
