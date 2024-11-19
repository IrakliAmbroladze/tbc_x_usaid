import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  distDir: './dist',
  async headers() {
    return [
      {
        source: '/:all*(svg|jpg|jpeg|png|webp|gif)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.dummyjson.com',
        port: '',
        pathname: '/**',
        search: '',
      },
      {
        protocol: 'https',
        hostname: 'images.klipfolio.com',
        port: '',
        pathname: '/website/public/**',
        search: '',
      },
      {
        protocol: 'https',
        hostname: 'cbhoxdzzhvcuajscuqes.supabase.co',
        port: '',
        pathname: '/storage/v1/object/public/product-images/**',
      },
    ],
  },
};

export default withNextIntl(nextConfig);
