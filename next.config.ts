/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: true,
  output: 'export', // Export as static site
  // Optimize external images for the Next.js Image component
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com', // Example: GitHub avatars
        pathname: '/**',
      },
    ],
    unoptimized: true,
  },
};

module.exports = nextConfig;
