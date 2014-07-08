var gulp = require('gulp');

var coffee = require('gulp-coffee');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var imagemin = require('gulp-imagemin');
var connect = require('gulp-connect');
var yuidoc = require("gulp-yuidoc");
var minifyCSS = require('gulp-minify-css');
var del = require('del');

var paths = {
    Est : {
        scripts: {
            source: ['Est.source.js'],
            dist: '',
            name: 'Est.min.js'
        },
        doc: {
            source: ['Est.source.js'],
            dist: './doc/Est'
        }
    },
    ng_treeview: {
        scripts:{
            source: ['angular-ui/ng-treeview/scripts/angular.treeview.js'],
            dist: 'angular-ui/ng-treeview/scripts',
            name : 'angular.treeview.min.js'
        },
        styles: {
            source: ['angular-ui/ng-treeview/styles/angular.treeview.css'],
            dist: 'angular-ui/ng-treeview/styles',
            name: 'angular.treeview.min.css'
        },
        doc: {
            source: ['angular-ui/ng-treeview/scripts/angular.treeview.js'],
            dist: './doc/angular-ui/ng-treeview'
        }
    }
};

gulp.task('begin', function(){
    for (var item in paths){
        for (var key in paths[item]){
            switch (key){
                case 'scripts':
                    try {
                        gulp.task(item + key, function(){
                            return gulp.src(paths[item].scripts.source)
                                .pipe(uglify())
                                .pipe(concat(paths[item].scripts.name))
                                .pipe(gulp.dest(paths[item].scripts.dist));
                        });
                        gulp.start(item + key);
                    } catch(e){
                        console.error(item + key + e);
                    }
                    break;

                case 'styles':
                    try {
                        gulp.task(item + key, function(){
                            return gulp.src(paths[item].styles.source)
                                .pipe(minifyCSS({keepBreaks:true}))
                                .pipe(concat(paths[item].styles.name))
                                .pipe(gulp.dest(paths[item].styles.dist));
                        });
                        gulp.start(item + key);
                    } catch(e){
                        console.error(item + key + e);
                    }
                    break;

                case 'doc':
                    try {
                        gulp.task(item + key, function(){
                            return gulp.src(paths[item].doc.source)
                                .pipe(yuidoc())
                                .pipe(gulp.dest(paths[item].doc.dist))
                        });
                        gulp.start(item + key);
                    } catch(e){
                        console.error(item + key + e);
                    }
                    break;

                case 'images':
                    try {
                        gulp.task(item + key, function(){
                            return gulp.src(paths[item].images.source)
                                .pipe(imagemin({optimizationLevel: 5}))
                                .pipe(gulp.dest(paths[item].images.dist));
                        });
                        gulp.start(item + key);
                    } catch(e){
                        console.error(item + key + e);
                    }
                    break;
                default:
            }
        }
    }
});

// 使用connect启动一个Web服务器
gulp.task('connect', function () {
    connect.server({
        root: 'test',
        livereload: true
    });
});
gulp.task('html', function () {
    gulp.src('./test/*.html')
        .pipe(connect.reload());
});

gulp.task('clean', function(cb) {
    del(['doc'], cb);
});

// 创建watch任务去检测文件,当文件改动之后，去调用一个Gulp的Task
gulp.task('watch', function() {
    gulp.watch(paths.scripts, ['scripts']);
    gulp.watch(paths.images, ['images']);
    gulp.watch(docPaths.scripts, ['yuidoc']);
    gulp.watch(['./test/*.html'], ['html']);
});

gulp.task('default', ['clean', 'begin']);