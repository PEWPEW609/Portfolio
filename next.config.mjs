/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  devIndicators: false,
  images: {
    // WebP only: AVIF encoding of the large 3000px hero source images is far
    // too slow on-demand and stalls the first paint. WebP is near-instant.
    formats: ["image/webp"],
  },
};

export default nextConfig;
