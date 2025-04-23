import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  output: 'standalone',
  images: {
    domains: ['profile.line-scdn.net'],
  },
  // distDir: '',
};

export default nextConfig;
