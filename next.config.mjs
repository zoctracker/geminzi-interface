/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    // !! ATTENTION !!
    // Permet de déployer même si des erreurs TS subsistent
    ignoreBuildErrors: true,
  },
  eslint: {
    // Permet de déployer même si des erreurs de linting subsistent
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
