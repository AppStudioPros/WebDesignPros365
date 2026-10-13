import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // --- PHP location pages (old programmatic SEO site) ---
      // Denver-specific → local landing page
      { source: '/:path*Denver_CO.php', destination: '/denver-web-design', permanent: true },
      { source: '/:path*Denver.php', destination: '/denver-web-design', permanent: true },
      // All other .php pages → services
      { source: '/:path*.php', destination: '/services', permanent: true },

      // --- Old structural pages (Wix era) ---
      { source: '/about-page', destination: '/about', permanent: true },
      { source: '/blogs', destination: '/blog', permanent: true },
      { source: '/contact-us', destination: '/contact', permanent: true },
      { source: '/book-free-consultation', destination: '/contact', permanent: true },
      { source: '/work', destination: '/portfolio', permanent: true },

      // --- Old blog posts (Wix era) ---
      { source: '/post/:slug', destination: '/blog', permanent: true },

      // --- Old service pages → all point to /services ---
      { source: '/services/website-development', destination: '/services', permanent: true },
      { source: '/services/ai-programs', destination: '/services/custom-ai', permanent: true },
      { source: '/services/collaboration-program', destination: '/services/program-creation', permanent: true },
      { source: '/services/social-media-marketing', destination: '/services', permanent: true },
      { source: '/services/mobile--app-development', destination: '/services', permanent: true },
      { source: '/services/mobile-app-development', destination: '/services', permanent: true },
      { source: '/services/ui-ux-design', destination: '/services', permanent: true },

      // --- Location services pages (Wix era) ---
      { source: '/location-services/:slug', destination: '/denver-web-design', permanent: true },

      // --- WordPress/security junk (block and redirect away) ---
      { source: '/feed', destination: '/blog', permanent: true },
      { source: '/feed/:path*', destination: '/blog', permanent: true },
      { source: '/category/:slug', destination: '/blog', permanent: true },
      { source: '/tag/:slug', destination: '/blog', permanent: true },
      { source: '/author/:slug', destination: '/about', permanent: true },
      { source: '/wp-content/:path*', destination: '/', permanent: true },
      { source: '/wp-admin/:path*', destination: '/', permanent: true },
      { source: '/wp-login.php', destination: '/', permanent: true },
      { source: '/xmlrpc.php', destination: '/', permanent: true },
    ];
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          // Security
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              "font-src 'self' https://fonts.gstatic.com",
              "img-src 'self' data: blob: https:",
              "connect-src 'self' https://www.google-analytics.com https://vitals.vercel-insights.com",
              "frame-src https://www.youtube-nocookie.com https://www.youtube.com",
              "object-src 'none'",
              "base-uri 'self'",
            ].join("; "),
          },
        ],
      },
    ];
  },
};

export default nextConfig;
