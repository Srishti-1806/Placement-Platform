/** @type {import('next').NextConfig} */
const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

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

  // For production builds
  output: 'standalone',

  // Use the correct serverExternalPackages option (not experimental)
  serverExternalPackages: ['sharp', 'onnxruntime-node'],

  // Webpack optimization
  webpack: (config, { dev, isServer }) => {
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
      };
    }
    return config;
  },

  // CORS headers for FastAPI backend
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'Access-Control-Allow-Origin', value: process.env.FRONTEND_URL || 'http://localhost:3000' },
          { key: 'Access-Control-Allow-Methods', value: 'GET, POST, OPTIONS' },
          { key: 'Access-Control-Allow-Headers', value: 'Content-Type' },
        ],
      },
    ];
  },

  async rewrites() {
    return [
      { source: '/api/summarize-pdf', destination: `${BACKEND_URL}/api/summarize-pdf` },
      { source: '/api/youtube-transcript', destination: `${BACKEND_URL}/api/youtube-transcript` },
      { source: '/api/ats-calculator', destination: `${BACKEND_URL}/api/ats-calculator` },
      { source: '/api/analyze-speech', destination: `${BACKEND_URL}/api/analyze-speech` },
      { source: '/api/jobs', destination: `${BACKEND_URL}/api/jobs` },
      { source: '/api/record-webcam', destination: `${BACKEND_URL}/api/record-webcam` },
      // Add more as needed
    ];
  },
};

export default nextConfig;
