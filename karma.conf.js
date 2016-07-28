const webpack = require('webpack')

module.exports = function(config) {
    config.set({
        browsers: ['Chrome', 'Firefox'],

        files: [
            './src/*.test.js',
            './src/**/*.test.js',
            './src/*.client-test.js',
            './src/**/*.client-test.js',
        ],

        preprocessors: {
            './src/*.test.js': ['webpack', 'sourcemap'],
            './src/**/*.test.js': ['webpack', 'sourcemap'],
            './src/*.client-test.js': ['webpack', 'sourcemap'],
            './src/**/*.client-test.js': ['webpack', 'sourcemap'],
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
                preLoaders: [
                    {
                        test: /.json$/,
                        loader: 'json',
                    },
                    {
                        test: /\.js$/,
                        include: [
                            /src/,
                        ],
                        exclude: [
                            /server-test\.js$/,
                        ],
                        loader: 'babel',
                    },
                ],
            },
            browser: {fs: false},
        },
        webpackMiddleware: {
            noInfo: true,
        },
    })
}
