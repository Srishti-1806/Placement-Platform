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
  missingSuspenseWithCSRBailout: false,
},
  
  // For production builds
  output: 'standalone',
  
  // Add webpack config for better build optimization
  webpack: (config, { dev, isServer }) => {
    // Optimize for production
    if (!dev && !isServer) {
      config.optimization.splitChunks = {
        chunks: 'all',
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all',
          },
        },
      }
    }
    return config
  },
  
  // FIXED: Use serverExternalPackages instead of experimental.serverComponentsExternalPackages
  serverExternalPackages: ['sharp', 'onnxruntime-node'],
}

export default nextConfig
