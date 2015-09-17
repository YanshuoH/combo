module.exports = function(grunt) {
    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        pkgFile: 'package.json',
        eslint: {
            options: {
                configFile: '.eslintrc'
            },
            target: ['src/*.js', 'tests/*.js', 'gruntfile.js']
        },
        jscs: {
            front: {
                src: ['js/*.js', 'tests/*.js', 'Gruntfile.js'],
                options: {
                    config: '.jscsrc',
                    excludeFiles: ['tests/test-main.js']
                }
            }
        },
        karma: {
            all: {
                configFile: 'karma.conf.js'
            }
        },
        coveralls: {
            options: {
                debug: true,
                coverageDir: 'reports/coverage/report-lcov',
                dryRun: false,
                force: true,
                recursive: true
            }
        }
    });

    grunt.registerTask('test', ['karma']);
    grunt.registerTask('coding-rules', ['jscs', 'eslint']);
    grunt.registerTask('default', ['coding-rules', 'test', 'coveralls']);
};
