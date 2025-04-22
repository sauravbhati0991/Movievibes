// @type {import('next').NextConfig}
const nextConfig = {
  output: 'export', // This enables static export
  images: {
    domains: [
      'image.tmdb.org',  // for TMDB images
      'lh3.googleusercontent.com', // for Google auth profile pictures
      'firebasestorage.googleapis.com' // for Firebase Storage images
    ],
    unoptimized: true, // Required when using 'output: export'
  },
};

export default nextConfig;
