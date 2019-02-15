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
      { pattern: 'lib/**/*js' },
      { pattern: 'test/*.spec.js' }
    ],
    exclude: [
    ],
    preprocessors: {
      'lib/**/*js': ['webpack', 'sourcemap', 'coverage'],
      'test/*.spec.js': ['webpack', 'sourcemap']
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
                    ['@babel/preset-env', {
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
          API_HOST: JSON.stringify(process.env.API_HOST),
          API_KEY: JSON.stringify(process.env.API_KEY),
        }),
      ],
      watch: true
    },
    webpackServer: {
      noInfo: true
    },
    reporters: ['spec', 'coverage'],
    coverageReporter: {
      type: 'lcov',
      dir: 'coverage/',
      subdir: '.'
    },
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
