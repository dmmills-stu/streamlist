// Import Serwist for service worker integration
import withSerwistInit from "@serwist/next";

// Initialize Serwist with service worker source and destination
const withSerwist = withSerwistInit({
  swSrc: "src/sw.ts", // Path to your custom service worker source file
  swDest: "public/sw.js", // Output location for the generated service worker
});


// Export the configuration wrapped with Serwist for service worker support
export default withSerwist({
  reactStrictMode: true, // Enable React strict mode for highlighting potential problems
  images: {
    // Allow loading images from TMDB using remotePatterns (recommended)
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'image.tmdb.org',
        port: '',
        pathname: '/**',
      },
    ],
  },
});
