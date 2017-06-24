/* eslint import/unambiguous:0 */

const webpack = require('webpack')


module.exports = function(config) {
    config.set({
        browsers: ['ChromeHeadless', 'ChromeCanaryHeadless', 'Firefox'],

        files: [
            './src/*.test.js',
            './src/**/*.test.js',
            './src/*.client-test.js',
            './src/**/*.client-test.js',
        ],

        preprocessors: {
            './src/**': ['webpack', 'sourcemap'],
        },

        frameworks: ['chai', 'mocha'],

        plugins: [
            'karma-chrome-launcher',
            'karma-firefox-launcher',
            'karma-chai',
            'karma-mocha',
            'karma-sourcemap-loader',
            'karma-webpack',
            'karma-mocha-reporter',
        ],

        reporters: ['mocha'],

        singleRun: true,

        // webpack config object
        webpack: {
            devtool: '#inline-source-map',
            plugins: [
                new webpack.IgnorePlugin(/source-map-support/),
            ],
            module: {
                rules: [{
                    test: /\.js$/,
                    include: [
                        /src/,
                    ],
                    exclude: [
                        /server-test\.js$/,
                    ],
                    use: [{loader: 'babel-loader'}],
                }],
            },
        },
        webpackMiddleware: {
            noInfo: true,
        },
    })
}
