/* eslint-disable */
const webpack = require('webpack');

process.env.CHROME_BIN = require('puppeteer').executablePath();

const NODE_ENV = process.env.NODE_ENV;
const COVERALLS = process.env.COVERALLS;
const mode = (NODE_ENV && NODE_ENV.trim() === 'production') ? 'production' : 'development';

let coverageReporter = {
  type: 'html',
};

if (COVERALLS) {
  coverageReporter = {
    type: 'lcov',
    dir: 'coverage/',
    subdir: '.',
  };
}

module.exports = function(config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine'],
    files: [
      { pattern: 'test-context.js', watched: false },
    ],
    exclude: [
    ],
    preprocessors: {
      'test-context.js': ['webpack', 'sourcemap'],
      'lib/**/*js': ['coverage'],
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
                  plugins: [
                    ["istanbul"]
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
    coverageReporter,
    port: 9876,
    colors: true,
    logLevel: config.LOG_DEBUG,
    client: {
      captureConsole: true,
      jasmine: {
        random: false,
        DEFAULT_TIMEOUT_INTERVAL: 160000,
      },
    },
    autoWatch: true,
    browsers: ['ChromeHeadless'],
    browserNoActivityTimeout: 160000,
    singleRun: false,
    concurrency: Infinity
  })
}
