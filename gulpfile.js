var gulp = require('gulp');

var coffee = require('gulp-coffee');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var imagemin = require('gulp-imagemin');
var yuidoc = require("gulp-yuidoc");

var del = require('del');

var paths = {
    scripts: ['Est.source.js'],
    images: 'vendor/images/*'
};

gulp.task('clean', function(cb) {
    del(['build'], cb);
});

// 脚本文件
gulp.task('scripts', ['clean'], function() {
    return gulp.src(paths.scripts)
        .pipe(uglify())
        .pipe(concat('Est.min.js'))
        .pipe(gulp.dest(''));
});

// js文档
gulp.task('yuidoc', ['clean'], function() {
    return gulp.src(paths.scripts)
        .pipe(yuidoc())
        .pipe(gulp.dest('./doc'));
});

// 图片
gulp.task('images', ['clean'], function() {
    return gulp.src(paths.images)
        .pipe(imagemin({optimizationLevel: 5}))
        .pipe(gulp.dest('dist/vendor/images'));
});

// 使用connect启动一个Web服务器
gulp.task('connect', function () {
    connect.server({
        root: 'www',
        livereload: true
    });
});

// 创建watch任务去检测文件,当文件改动之后，去调用一个Gulp的Task
gulp.task('watch', function() {
    gulp.watch(paths.scripts, ['scripts']);
    gulp.watch(paths.images, ['images']);
});

gulp.task('default', ['watch', 'scripts', 'yuidoc', 'images']);