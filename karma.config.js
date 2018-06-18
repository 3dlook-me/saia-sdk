/* eslint-disable */

process.env.CHROME_BIN = require('puppeteer').executablePath()

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
      watch: true
    },
    webpackServer: {
      noInfo: true
    },
    reporters: ['progress'],
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
    singleRun: false,
    concurrency: Infinity
  })
}
