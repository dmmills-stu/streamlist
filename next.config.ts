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
  serwist: {
    runtimeCaching: [
      // Cache static assets (JS, CSS, fonts) with StaleWhileRevalidate strategy
      {
        urlPattern: ({ request }: { request: Request }) =>
        request.destination === "script" ||
        request.destination === "style" ||
        request.destination === "font",
        handler: "StaleWhileRevalidate",
        options: {
          cacheName: "static-assets",
          expiration: {
            maxEntries: 50,
            maxAgeSeconds: 7 * 24 * 60 * 60,
          },
        },
      },
      // Cache TMDB images with CacheFirst strategy
      {
        urlPattern: /^https:\/\/image\.tmdb\.org\//,
        handler: "CacheFirst",
        options: {
          cacheName: "movie-images",
          expiration: {
            maxEntries: 100,
            maxAgeSeconds: 30 * 24 * 60 * 60,
          },
        },
      },
      // Cache TMDB API responses with NetworkFirst strategy
      {
        urlPattern: /^https:\/\/api\.themoviedb\.org\//,
        handler: "NetworkFirst",
        options: {
          cacheName: "tmdb-api-cache",
          networkTimeoutSeconds: 3,
          expiration: {
            maxEntries: 50,
            maxAgeSeconds: 3600,
          },
        },
      },
    ],
  },
});
