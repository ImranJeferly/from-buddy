/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['lh3.googleusercontent.com'],
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // Node.js modules that should be ignored in the browser
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        http: false,
        https: false,
        path: false,
        crypto: false,
        stream: false,
        zlib: false,
        os: false,
        net: false,
        tls: false,
        child_process: false,
        util: false,
        url: false,
        assert: false,
        buffer: false,
        querystring: false,
        constants: false,
        punycode: false,
        process: false,
        events: false,
      };
    }
    return config;
  },
};

export default nextConfig;
