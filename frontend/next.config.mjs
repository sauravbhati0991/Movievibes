// @type {import('next').NextConfig}
const nextConfig = {
  images: {
    output: 'export',
      domains: [
        'image.tmdb.org',  // for TMDB images
        'lh3.googleusercontent.com', // for Google auth profile pictures
        'firebasestorage.googleapis.com' // for Firebase Storage images
      ],
    },
};

export default nextConfig;
