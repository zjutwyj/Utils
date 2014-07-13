var mountFolder = function (connect, dir) {
    return connect.static(require('path').resolve(dir));
};
module.exports = function (grunt) {

    require('load-grunt-tasks')(grunt);

    grunt.registerTask('serve', ['connect:serve', 'watch']);

    grunt.registerTask('dev', [
        'clean',
        'ngTemplateCache',
        'concat',
        'less',
        'copy'
    ]);

    grunt.registerTask('default', [
        'dev',
        'uglify',
        'cssmin'
    ]);

    grunt.initConfig({
        cmpnt: grunt.file.readJSON('bower.json'),
        banner: '/*! ngTable v<%= cmpnt.version %> by Vitalii Savchuk(esvit666@gmail.com) - ' +
            'https://github.com/esvit/ng-table - New BSD License */\n',
        clean: {

            working: {
                src: ['ng-table.*', './.temp/views', './.temp/']
            }
        },
        copy: {
            styles: {
                files: [
                    {
                        src: './src/styles/ng-table.less',
                        dest: './ng-table.less'
                    }
                ]
            }
        },
        uglify: {
            js: {
                src: ['ng-table.js'],
                dest: 'ng-table.min.js',
                options: {
                    banner: '<%= banner %>',
                    sourceMap: function (fileName) {
                        return fileName.replace(/\.min\.js$/, '.map');
                    }
                }
            }
        },
        concat: {
            js: {
                src: [
                    'src/controllers/01-*.js',
                    'src/controllers/02-*.js',
                    'src/controllers/03-*.js',
                    'src/controllers/04-*.js',
                    'src/controllers/05-*.js',
                    'src/controllers/06-*.js',
                    './.temp/controllers/views.js',
                    'src/controllers/07-*.js'
                ],
                dest: 'ng-table.js'
            }
        },
        less: {
            css: {
                files: {
                    'ng-table.css': 'src/styles/ng-table.less'
                }
            }
        },
        cssmin: {
            css: {
                files: {
                    'ng-table.min.css': 'ng-table.css'
                },
                options: {
                    banner: '<%= banner %>'
                }
            }
        },
        watch: {
            css: {
                files: 'src/styles/*.less',
                tasks: ['less'],
                options: {
                    livereload: true
                }
            },
            js: {
                files: 'src/controllers/*.js',
                tasks: ['concat'],
                options: {
                    livereload: true
                }
            },
            html: {
                files: 'src/ng-table/*.html',
                tasks: ['ngTemplateCache', 'concat'],
                options: {
                    livereload: true
                }
            }
        },
        connect: {
            options: {
                port: 8000,
                hostname: 'localhost'
            },
            serve: {
                options: {
                    middleware: function (connect) {
                        return [
                            mountFolder(connect, '.')
                        ];
                    }
                }
            }
        },
        ngTemplateCache: {
            views: {
                files: {
                    './.temp/scripts/views.js': 'src/ng-table/**/*.html'
                },
                options: {
                    trim: 'src/',
                    module: 'ngTable'
                }
            }
        }
    });
};
