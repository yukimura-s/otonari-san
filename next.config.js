/** @type {import('next').NextConfig} */
const fs = require('fs');
const path = require('path');

const nextConfig = {
  experimental: {
    serverExternalPackages: ['next'],
  },
  server: {
    https: true,
  },
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.https = {
        key: fs.readFileSync(path.join(__dirname, 'certs/localhost.key')),
        cert: fs.readFileSync(path.join(__dirname, 'certs/localhost.crt')),
      };
    }
    return config;
  },
};

module.exports = nextConfig; 