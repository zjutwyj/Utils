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
            scripts: ['Est.source.js'],
            dist: ['./doc/Est']
        }
    },
    ng_treeview: {
        scripts:{
            source: ['angular-ui/ng-treeview/scripts/angular.treeview.js'],
            dist: 'angular-ui/ng-treeview/scripts',
            name : 'angular.treeview.min.js'
        },
        images: {
            source:'angular-ui/ng-treeview/images/*',
            dist:'angular-ui/ng-treeview/images'
        },
        styles: {
            source: ['angular-ui/ng-treeview/styles/*'],
            dist: 'angular-ui/ng-treeview/styles',
            name: 'angular.treeview.min.css'
        }
    }
};

gulp.task('begin', function(){
    for (var item in paths){
        for (var key in paths[item]){
            switch (key){
                case 'scripts':
                    gulp.task(key + 'scripts', ['clean'], function(){
                        return gulp.src(paths[key].scripts.source)
                            .pipe(uglify())
                            .pipe(concat(paths[key].scripts.name))
                            .pipe(gulp.dest(paths[key].scripts.dist));
                    });
                    gulp.start(key + 'scripts');

                case 'styles':
                    gulp.task(key + 'styles', ['clean'], function(){
                        return gulp.src(paths[key].styles.source)
                            .pipe(minifyCSS({keepBreaks:true}))
                            .pipe(gulp.dest(paths[key].images.dist));
                    });
                    gulp.start(key + 'styles');

                case 'doc':
                    gulp.task(key + 'doc', ['clean'], function(){
                        return gulp.src(paths[key].doc.source)
                            .pipe(yuidoc())
                            .pipe(gulp.dest(paths[key].doc.dist))
                    });
                    gulp.start(key + 'doc');

                case 'images':
                    gulp.task(key + 'images', ['clean'], function(){
                        return gulp.src(paths[key].images.source)
                            .pipe(imagemin({optimizationLevel: 5}))
                            .pipe(gulp.dest(paths[key].images.dist));
                    });
                    gulp.start(key + 'images');
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
    del(['build'], cb);
});

// 创建watch任务去检测文件,当文件改动之后，去调用一个Gulp的Task
gulp.task('watch', function() {
    gulp.watch(paths.scripts, ['scripts']);
    gulp.watch(paths.images, ['images']);
    gulp.watch(docPaths.scripts, ['yuidoc']);
    gulp.watch(['./test/*.html'], ['html']);
});

gulp.task('default', ['begin']);