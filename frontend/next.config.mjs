// @type {import('next').NextConfig}
const nextConfig = {
    output: 'export',
    images: {
        unoptimized: true,
        domains: [
          'image.tmdb.org',  // for TMDB images
          'lh3.googleusercontent.com', // for Google auth profile pictures
          'firebasestorage.googleapis.com' // for Firebase Storage images
        ],
      },
    reactStrictMode: true,
    swcMinify: true,
    trailingSlash: true
};

export default nextConfig;
