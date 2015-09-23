// Karma configuration

module.exports = function(config) {
    config.set({
        basePath: '',
        frameworks: ['mocha', 'chai'],
        files: [
            'src/*.js',
            'tests/*Test.js'
        ],
        exclude: [
        ],
        preprocessors: {
            'src/*js': ['coverage']
        },
        reporters: ['progress', 'coverage'],
        coverageReporter: {
            dir: 'reports/coverage',
            reporters: [
                {type: 'html', subdir: 'report-html'},
                {type: 'lcov', subdir: 'report-lcov'},
            ]
        },
        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: false,
        browsers: ['PhantomJS'],
        singleRun: true
    });
};
