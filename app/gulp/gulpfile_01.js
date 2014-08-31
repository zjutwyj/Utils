var gulp = require('gulp');
var gutil = require('gulp-util');
var bower = require('bower');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var sh = require('shelljs');

var paths = {
    sass: ['./scss/**/*.scss']
};

gulp.task('default', ['sass']);

gulp.task('sass', function(done) {
    gulp.src('./scss/ionic.app.scss')
        .pipe(sass())
        .pipe(gulp.dest('./www/css/'))
        .pipe(minifyCss({
            keepSpecialComments: 0
        }))
        .pipe(rename({ extname: '.min.css' }))
        .pipe(gulp.dest('./www/css/'))
        .on('end', done);
});

gulp.task('watch', function() {
    gulp.watch(paths.sass, ['sass']);
});

gulp.task('install', ['git-check'], function() {
    return bower.commands.install()
        .on('log', function(data) {
            gutil.log('bower', gutil.colors.cyan(data.id), data.message);
        });
});

gulp.task('git-check', function(done) {
    if (!sh.which('git')) {
        console.log(
                ' ' + gutil.colors.red('Git is not installed.'),
            '\n Git, the version control system, is required to download Ionic.',
            '\n Download git here:', gutil.colors.cyan('http://git-scm.com/downloads') + '.',
                '\n Once git is installed, run \'' + gutil.colors.cyan('gulp install') + '\' again.'
        );
        process.exit(1);
    }
    done();
});

//pr
var ngmin = require('gulp-ngmin');

gulp.task('ngmin', function () {
    return gulp.src('./www/js/*.js')
        .pipe(ngmin({dynamic: false}))
        .pipe(gulp.dest('dist'));
});

var stripDebug = require('gulp-strip-debug');

var uglify = require('gulp-uglify');

gulp.task('compress', function() {
    gulp.src('./www/js/**/*.js')
        .pipe(stripDebug())
        .pipe(uglify({outSourceMap: false}))
        .pipe(gulp.dest('./platforms/ios/www/js/'))
});

var rimraf = require('rimraf'); // rimraf directly
gulp.task('delete', function (cb) {
    rimraf('./platforms/ios/www/mock', cb);
    rimraf('./platforms/ios/www/templates/statics', cb);
// rimraf('./platforms/ios/www/lib', cb);
// rimraf('./platforms/ios/www/lib/ionic/js/ionic.bundle.js', cb);

});
var grimraf = require('gulp-rimraf');

gulp.task('del', function() {
    gulp.src('./platforms/ios/www/mock', { read: false }) // much faster
// .pipe(ignore('node_modules/**'))
        .pipe(grimraf());

    gulp.src('./platforms/ios/www/templates/statics', { read: false }) // much faster
        .pipe(grimraf());

    gulp.src('./platforms/ios/www/res', { read: false }).pipe(grimraf());
    gulp.src('./platforms/ios/www/css/ionic.app.css', { read: false }).pipe(grimraf());

    gulp.src('./platforms/ios/www/lib/angular', { read: false }).pipe(grimraf());
    gulp.src('./platforms/ios/www/lib/angular-animate', { read: false }).pipe(grimraf());
    gulp.src('./platforms/ios/www/lib/angular-sanitize', { read: false }).pipe(grimraf());
    gulp.src('./platforms/ios/www/lib/angular-ui-router', { read: false }).pipe(grimraf());
    gulp.src('./platforms/ios/www/lib/angular-ui-router', { read: false }).pipe(grimraf());
    gulp.src('./platforms/ios/www/lib/ionic/scss', { read: false }).pipe(grimraf());
    gulp.src('./platforms/ios/www/lib/ionic/css', { read: false }).pipe(grimraf());
    gulp.src('./platforms/ios/www/lib/ionic/js/ionic-angular.js', { read: false }).pipe(grimraf());
    gulp.src('./platforms/ios/www/lib/ionic/js/ionic-angular.min.js', { read: false }).pipe(grimraf());
    gulp.src('./platforms/ios/www/lib/ionic/js/ionic.js', { read: false }).pipe(grimraf());
    gulp.src('./platforms/ios/www/lib/ionic/js/ionic.min.js', { read: false }).pipe(grimraf());
    gulp.src('./platforms/ios/www/lib/ionic/js/ionic.bundle.js', { read: false }).pipe(grimraf());
    gulp.src('./platforms/ios/www/lib/ionic/css', { read: false }).pipe(grimraf());
    gulp.src('./platforms/ios/www/lib/ionic/README.md', { read: false }).pipe(grimraf());


});

var replace = require('gulp-replace');

gulp.task('rep', function(){
    gulp.src('./www/index.html')
        .pipe(replace( "ionic.bundle.js" , "ionic.bundle.min.js"))
        .pipe(replace( "ionic.app.css", "ionic.app.min.css"))

        .pipe(gulp.dest('./platforms/ios/www/'));
});


gulp.task('publish', ['sass','compress','del','rep']);