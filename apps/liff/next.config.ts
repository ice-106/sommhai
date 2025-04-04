import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  swcMinify: true,
  output: 'standalone',
  // webpack: (config) => {
  // config.resolve.alias = {
  //   ...config.resolve.alias,
  //   '@ui': path.resolve(__dirname, '../../packages/ui/src')
  // };
  // return config;}
};

export default nextConfig;
