/** @type {import('next').NextConfig} */
const nextConfig = {
  // Optimized for production
  reactStrictMode: true,
  
  // Image optimization
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'wvyeuudaerurvpvljmgq.supabase.co',
        pathname: '/storage/v1/object/public/**',
      },
      {
        protocol: 'https',
        hostname: 'cdn.leonardo.ai',
      },
    ],
  },

  // Ensure clean URLs and proper redirects
  async redirects() {
    return [
      // Redirect trailing slashes to clean URLs
      {
        source: '/:path((?!.*\\.).*)*/',
        destination: '/:path*',
        permanent: true,
      },
    ];
  },

  // Ensure proper headers for SEO
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Robots-Tag',
            value: 'index, follow',
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;

