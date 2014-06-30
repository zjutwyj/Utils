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

gulp.task('scripts', ['clean'], function() {
    return gulp.src(paths.scripts)
        .pipe(uglify())
        .pipe(concat('Est.min.js'))
        .pipe(gulp.dest(''));
});
gulp.task('yuidoc', ['clean'], function() {
    return gulp.src(paths.scripts)
        .pipe(yuidoc())
        .pipe(gulp.dest('./doc'));
});
gulp.task('images', ['clean'], function() {
    return gulp.src(paths.images)
        .pipe(imagemin({optimizationLevel: 5}))
        .pipe(gulp.dest('dist/vendor/images'));
});

gulp.task('watch', function() {
    gulp.watch(paths.scripts, ['scripts']);
    gulp.watch(paths.images, ['images']);
});

gulp.task('default', ['watch', 'scripts', 'yuidoc', 'images']);