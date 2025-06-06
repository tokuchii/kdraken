/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    useDeploymentId: true,
    // Optionally, use with Server Actions
    useDeploymentIdServerActions: true,
  },
  // Keep existing devIndicators setting
  devIndicators: false,
};

module.exports = nextConfig; 