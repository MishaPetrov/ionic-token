module.exports = function(config) {
    var testWebpackConfig = require('./webpack.test.js')({env: 'test'});

    var configuration = {

        basePath: '',
        frameworks: ['jasmine'],
        exclude: [ ],
        files: [ { pattern: './config/spec-bundle.js', watched: false } ],
        preprocessors: { './config/spec-bundle.js': ['coverage', 'webpack', 'sourcemap'] },
        webpack: testWebpackConfig,

        coverageReporter: {
            type: 'in-memory'
        },

        remapCoverageReporter: {
            'text-summary': null,
            json: './coverage/coverage.json',
            html: './coverage/html'
        },

        plugins: [
          require('karma-jasmine'),
            require('karma-phantomjs-launcher'),
            require('karma-remap-coverage'),
            require('karma-mocha-reporter'),
            require('karma-coverage'),
            require('karma-webpack'),
            require('karma-sourcemap-loader'),

        ],

        webpackMiddleware: { stats: 'errors-only'},
        reporters: [ 'mocha', 'coverage', 'remap-coverage' ],
        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: false,

        browsers: [ 'PhantomJS' ],

        customLaunchers: {
            ChromeTravisCi: {
                base: 'Chrome',
                flags: ['--no-sandbox']
            }
        },

        singleRun: true
    };

    if (process.env.TRAVIS){
        configuration.browsers = [
            'ChromeTravisCi'
        ];
    }

    config.set(configuration);
};
