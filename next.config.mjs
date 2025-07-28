/** @type {import('next').NextConfig} */
const config = {
  experimental: {
    esmExternals: 'loose',
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },

  // 3. Inject security headers on every route:
  async headers() {
    return [
      {
        // Matches ALL routes
        source: '/(.*)',
        headers: [
          {
            key: "X-Frame-Options",
            value: "DENY",               // Prevent any iframe embedding
          },
          {
            key: "Content-Security-Policy",
            // Disallows any framing of this page
            value: "frame-ancestors 'none';",
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains; preload',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
        ],
      },
    ];
  },
};

export default config;
