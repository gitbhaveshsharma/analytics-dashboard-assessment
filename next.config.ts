/** @type {import('next').NextConfig} */
interface WebpackConfig {
  module: {
    rules: Array<{
      test: RegExp;
      loader: string;
      options: {
        name: string;
      };
    }>;
  };
}

interface NextConfig {
  reactStrictMode: boolean;
  webpack: (config: WebpackConfig) => WebpackConfig;
}

const nextConfig: NextConfig = {
  reactStrictMode: true,
  webpack: (config) => {
    config.module.rules.push({
      test: /\.csv$/,
      loader: 'file-loader',
      options: {
        name: 'static/[name].[ext]',
      },
    });
    return config;
  },
};
  
  module.exports = nextConfig
  
  