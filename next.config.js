/* eslint-disable global-require */
require('dotenv').config();
const withSass = require('@zeit/next-sass');
const withCSS = require('@zeit/next-css');
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

module.exports = withBundleAnalyzer(
  withCSS(
    withSass({
      webpack: (
        config,
        { buildId, dev, isServer, defaultLoaders, webpack }
      ) => {
        // Note: we provide webpack above so you should not `require` it
        // Perform customizations to webpack config
        // Important: return the modified config
        const customConfig = {
          ...config,
        };

        customConfig.plugins.push(new webpack.EnvironmentPlugin(process.env));
        customConfig.plugins = config.plugins.filter((plugin) => {
          if (plugin.constructor.name === 'ForkTsCheckerWebpackPlugin')
            return false;
          return true;
        });
        customConfig.plugins.push(new webpack.IgnorePlugin(/\/__tests__\//));

        if (dev) {
          const StyleLintPlugin = require('stylelint-webpack-plugin');
          customConfig.plugins.push(
            new StyleLintPlugin({
              configFile: './.stylelintrc',
              files: ['**/*.css', '**/*.scss'],
              emitErrors: false,
            })
          );

          customConfig.module.rules.push({
            enforce: 'pre',
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            use: [
              {
                options: {
                  formatter: require.resolve('react-dev-utils/eslintFormatter'),
                  eslintPath: require.resolve('eslint'),
                  parser: require.resolve('babel-eslint'),
                  emitWarning: true,
                },
                loader: require.resolve('eslint-loader'),
              },
            ],
          });
        }

        return customConfig;
      },
      cssModules: true,
      cssLoaderOptions: {
        localIdentName: '[name]_[local]_[hash:base64:5]',
      },
    })
  )
);
