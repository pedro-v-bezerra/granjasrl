/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true, // Enables React Strict Mode for development
  images: {
    domains: ['example.com'], // Allows images from external domains
  },
};

export default nextConfig;
