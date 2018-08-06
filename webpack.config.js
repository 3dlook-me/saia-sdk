/* eslint-disable */
const webpack = require('webpack');
const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const NODE_ENV = process.env.NODE_ENV;
const mode = (NODE_ENV && NODE_ENV.trim() === 'production') ? 'production' : 'development';

/**
 * Building paths
 */
const paths = {
  src: {
    js: path.resolve(`${__dirname}/index.js`),
  },
  dist: {
    js: path.resolve(`${__dirname}/js`),
    css: path.resolve(`${__dirname}/css`),
  },
};

/**
 * Webpack config
 */
const config = {
  mode,
  watch: mode === 'development',
  watchOptions: {
    aggregateTimeout: 300,
    poll: 1000,
    ignored: /node_modules/,
  },
  entry: {
    'saia-sdk': paths.src.js,
  },
  output: {
    path: `${__dirname}/dist/`,
    filename: '[name].js',
    library: 'SAIA',
    libraryTarget: 'var',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                ['env', {
                  targets: {
                    browsers: ['last 2 versions', 'safari >= 7'],
                  },
                }],
              ],
            },
          },
        ],
      },
    ],
  },
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: true
      }),
    ]
  },
  resolve: {
    extensions: [ '.js' ],
    modules: [
      'node_modules'
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      API_HOST: (mode === 'production') ? JSON.stringify('https://saia.3dlook.me/api/v2/') : JSON.stringify('https://saia-test.3dlook.me/api/v2/'),
    }),
  ],
  devtool: (mode === 'production') ? false : 'source-map',
};

module.exports = config;
