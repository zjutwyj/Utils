var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var imagemin = require('gulp-imagemin');
var minifyCSS = require('gulp-minify-css');
var usemin = require('gulp-usemin');
var htmlmin = require('gulp-htmlmin');
var rev = require('gulp-rev');
var del = require('del');

var SRCDIR = './app',
    TMPDIR = './.tmp',
    DISTDIR = './dist',
    src = {
        all: [SRCDIR + '/**', TMPDIR + '/**'],
        html: [SRCDIR + '/index.html'],
        scripts: [SRCDIR + '/scripts/**/*.js', TMPDIR + '/scripts/**/*.js'],
        styles: [SRCDIR + '/styles/**/*.css', TMPDIR + '/styles/**/*.css']
    },
    dist = {
        all: DISTDIR + '/**',
        html: DISTDIR + '/index.html',
        scripts: DISTDIR + '/scripts',
        styles: DISTDIR + '/styles',
        images: DISTDIR + '/images',
        font: DISTDIR + '/font',
        source: DISTDIR + '/vendor'
    };

gulp.task('usemin', function() {
    gulp.src(src.html)
        .pipe(usemin({
            css: [minifyCSS(), 'concat'],
            html: [htmlmin({empty: true})],
            js: [uglify(), rev()]
        }))
        .pipe(gulp.dest(dist.all));
});
gulp.task('dist-clean', function (callback) {
    del(dist.all, callback);
});
gulp.task('publish',['dist-clean'], function(){

});