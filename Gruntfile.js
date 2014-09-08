module.exports = function(grunt) {

    grunt.initConfig({
        enb: {
            development: {
                beforeBuild: function () {},
                afterBuild: function () {},
                env: {
                    YENV: 'development'
                },
                targets: [
                    'app/desktop/index',
                    'app/bundle/ember',
                    'app/bundle/jquery',
                    'app/bundle/websocket'
                ]
            }
        },
        bower: {
            lib: {
                options: {
                    targetDir: './lib',
                    verbose: false,
                    layout: 'byComponent',
                    cleanTargetDir: false,
                    cleanBowerDir: true,
                    bowerOptions: {
                        production: true
                    }
                }
            }
        },
        ender: {
            options: {
                dependencies: [
                    'scriptjs',
                    'jar',
                    'ym',
                    'q'
                ],
                output: 'blocks/common/core/__ender/core__ender',
                debug: false
            }
        }
    });

    grunt.loadNpmTasks('grunt-enb');
    grunt.loadNpmTasks('grunt-ender');
    grunt.loadNpmTasks('grunt-bower-task');

    grunt.registerTask('build', ['bower', 'ender', 'enb']);
    grunt.registerTask('default', 'enb:development');
};
