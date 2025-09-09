/** @type {import('next').NextConfig} */
const isDev = process.env.NODE_ENV === "development";

const securityHeaders = [
  {
    key: "Content-Security-Policy",
    value: `
      default-src 'self';
      script-src 'self' 'unsafe-inline' ${isDev ? "'unsafe-eval'" : ""}
        https://www.googletagmanager.com
        https://www.google-analytics.com;
      style-src 'self' 'unsafe-inline';
      img-src 'self' data:;
      connect-src 'self' https://api.github.com https://www.google-analytics.com;
      frame-src 'self';
    `.replace(/\s{2,}/g, " ").trim(),
  },
];

const nextConfig = {
  images: {
    domains: ["localhost"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },
};

module.exports = nextConfig;
