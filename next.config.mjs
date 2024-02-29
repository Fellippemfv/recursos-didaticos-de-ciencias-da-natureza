/** @type {import('next').NextConfig} */
const nextConfig = {  
    env: {
    NEXT_PUBLIC_GITHUB_TOKEN: process.env.NEXT_PUBLIC_GITHUB_TOKEN,
  },
};

export default nextConfig;
