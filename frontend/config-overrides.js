const webpack = require('webpack');

const { override } = require('customize-cra');
const path = require('path');
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');


module.exports = override(

  (config) => {
    config.resolve.fallback = {
      "fs": false,
      "zlib": false,
      "stream": false,
      "querystring": false,
      "path": false,
      "crypto": false,
      "http": false,
      "process": false,
      "async_hooks": false
      // Add other fallbacks as needed
    };

    // Add your path alias
    config.resolve.alias = {
      ...config.resolve.alias,
      'src': path.resolve(__dirname, 'src'),
    };
     config.plugins = (config.plugins || []).concat([
      new NodePolyfillPlugin()
    ]);
config.plugins.push(
      new webpack.ProvidePlugin({
        process: 'process/browser',
      })
    );
       // Suppress the specific warning
    config.stats = {
      warningsFilter: [
        /Critical dependency: the request of a dependency is an expression/
      ],
      errorDetails: true
    };
    return config;
  }
);