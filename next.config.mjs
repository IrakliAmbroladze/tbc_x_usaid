import createNextIntlPlugin from 'next-intl/plugin';
 
const withNextIntl = createNextIntlPlugin();
 
/** @type {import('next').NextConfig} */
const nextConfig = {
  distDir: './dist',
  images: {
    domains: ["cdn.dummyjson.com"],
  }
};
 
export default withNextIntl(nextConfig);

