/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ["res.cloudinary.com"],
    },
    reactStrictMode: true,
    env: {
        PAYSTACK_KEY: process.env.PAYSTACK_TEST_PUBLIC_KEY,
    },
    experimental: {
        serverActions: true,
      },
};

module.exports = nextConfig;
