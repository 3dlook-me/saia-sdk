/* eslint-disable */
const webpack = require('webpack');

process.env.CHROME_BIN = require('puppeteer').executablePath();

const NODE_ENV = process.env.NODE_ENV;
const mode = (NODE_ENV && NODE_ENV.trim() === 'production') ? 'production' : 'development';

module.exports = function(config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine'],
    files: [
      { pattern: 'test-context.js', watched: false }
    ],
    exclude: [
    ],
    preprocessors: {
      'test-context.js': ['webpack', 'sourcemap']
    },
    webpack: {
      mode,
      devtool: 'inline-source-map',
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
          }
        ],
      },
      plugins: [
        new webpack.DefinePlugin({
          API_HOST: JSON.stringify('https://saia-test.3dlook.me/api/v2/'),
        }),
      ],
      watch: true
    },
    webpackServer: {
      noInfo: true
    },
    reporters: ['spec'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_DEBUG,
    client: {
      captureConsole: true,
      jasmine: {
        random: false,
        DEFAULT_TIMEOUT_INTERVAL: 60000,
      },
    },
    autoWatch: true,
    browsers: ['ChromeHeadless'],
    browserNoActivityTimeout: 60000,
    singleRun: false,
    concurrency: Infinity
  })
}
