'use strict';
/**
 * Created by hky on 3/14/14.
 */
var gulp = require('gulp'),
  path = require('path'),
  stylish = require('jshint-stylish'),
  wiredep = require('wiredep').stream;

var plugins = require('gulp-load-plugins')({
  lazy: false
}),
  SRCDIR = './app',
  TMPDIR = './.tmp',
  DISTDIR = './dist',
  src = {
    all: [SRCDIR + '/**', TMPDIR + '/**'],
    html: [SRCDIR + '/index.html', SRCDIR + '/login.html'],
    templates: [SRCDIR + '/views/**/*.html'],
    scripts: [SRCDIR + '/scripts/**/*.js', TMPDIR + '/scripts/**/*.js'],
    coffees: [SRCDIR + '/scripts/**/*.coffee'],
    styles: [SRCDIR + '/styles/**/*.css', TMPDIR + '/styles/**/*.css'],
    scsses: [SRCDIR + '/styles/**/*.scss'],
    images: [SRCDIR + '/images/**/*'],
    fonts: [SRCDIR + '/font/**/*', SRCDIR + '/bower_components/fontawesome/font/*'],
    sources: SRCDIR + '/vendor/**/*',
    bower: SRCDIR + '/bower_components',
    source: SRCDIR + '/vendor'
  },
  dist = {
    all: DISTDIR + '/**',
    scripts: DISTDIR + '/scripts',
    styles: DISTDIR + '/styles',
    images: DISTDIR + '/images',
    font: DISTDIR + '/font',
    source: DISTDIR + '/vendor'
  };
/**
 * Development Mode
 *
 */
gulp.task('default', function () {
  gulp.start('serve');
});

gulp.task('serve', ['build'], function () {
  gulp.start('connect');
  gulp.start('watch');
});

gulp.task('build', ['clean', 'wiredep'], function () {
  //return [gulp.start('compass'), gulp.start('coffee')];
});

gulp.task('watch', function () {
  gulp.watch(src.all, function (event) {
    return gulp.src(event.path)
      .pipe(plugins.connect.reload());
  });
  //gulp.watch(src.scsses, ['compass']);
  gulp.watch('bower.json', ['wiredep']);
});

gulp.task('connect', function() {
  plugins.connect.server({
    root: ['app', '.tmp'],
    host: 'example.com',
    port: 9000,
    livereload: true
  });
});

gulp.task('bower', function () {
  return plugins.bower()
    .pipe(gulp.dest(src.bower));
});
gulp.task('coffee', function () {
  return gulp.src(src.coffees)
    .pipe(plugins.coffee())
    .pipe(gulp.dest(TMPDIR + '/scripts'))
    .pipe(plugins.size());
});

gulp.task('compass', function () {
  return gulp.src(src.scsses)
    .pipe(plugins.compass({
      css: path.join(__dirname, SRCDIR, 'styles'),
      sass: path.join(__dirname, SRCDIR, 'styles'),
      images: path.join(__dirname, SRCDIR, 'images'),
      font: path.join(__dirname, SRCDIR, 'font')
    }))
    .pipe(gulp.dest(TMPDIR + '/styles'))
    .pipe(plugins.size());
});

gulp.task('templates', function () {
  return gulp.src(src.templates)
    .pipe(plugins.minifyHtml({
      empty: true,
      spare: true,
      quotes: true
    }))
    .pipe(plugins.ngHtml2js({
      moduleName: 'angularOneApp',
      prefix: 'views/'
    }))
    .pipe(plugins.concat('views.js'))
    .pipe(plugins.ngmin())
    .pipe(plugins.uglify())
    .pipe(gulp.dest(DISTDIR + '/scripts'))
    .pipe(plugins.size());
});

gulp.task('clean', function () {
  return gulp.src(TMPDIR, {
    read: false
  })
    .pipe(plugins.clean());
});
//Inject Bower
gulp.task('wiredep', ['bower'], function () {
  gulp.src(src.html)
    .pipe(wiredep({
      directory: src.bower,
      ignorePath: SRCDIR
    }))
    .pipe(gulp.dest(SRCDIR));
  /*gulp.src(src.styles)
        .pipe(wiredep({
            directory: src.bower,
            ignorePath: SRCDIR,
        }))
        .pipe(gulp.dest(TMPDIR));
    */
});

gulp.task('jshint', function () {
  return gulp.src(src.scripts)
    .pipe(plugins.jshint('.jshintrc'))
    .pipe(plugins.jshint.reporter(stylish))
    .pipe(plugins.size());
});
/**
 * Production Mode
 *
 *
 */
gulp.task('html', ['templates', 'build'], function () {
  var jsfilters = plugins.filter(src.scripts),
    cssfilters = plugins.filter(src.styles),
    useref = plugins.useref;
  return gulp.src(src.html)
    //.pipe(plugins.googleCdn(require('./bower.json'), {
    //  componentsPath: src.bower
    //}))
    .pipe(useref.assets())
    .pipe(jsfilters)
    .pipe(plugins.ngmin())
    .pipe(plugins.uglify())
    .pipe(jsfilters.restore())
    .pipe(cssfilters)
    .pipe(plugins.autoprefixer('last 2 version', 'ie 8', 'ie 7'))
    .pipe(plugins.minifyCss())
    .pipe(cssfilters.restore())
    .pipe(useref.restore())
    .pipe(useref())
    .pipe(gulp.dest(DISTDIR))
    .pipe(plugins.size());
});

gulp.task('images', function () {
  return gulp.src(src.images)
    .pipe(plugins.imagemin({
      optimizationLevel: 1
    }))
    .pipe(gulp.dest(dist.images))
    .pipe(plugins.size());
});

gulp.task('font', function () {
  return gulp.src(src.fonts)
    .pipe(gulp.dest(dist.font))
    .pipe(plugins.size());
});

gulp.task('source', function () {
  return gulp.src(src.sources)
    .pipe(gulp.dest(dist.source))
    .pipe(plugins.size());
});

gulp.task('dist-clean', function () {
  return gulp.src(dist.all, {
    read: false
  })
    .pipe(plugins.clean());
});

gulp.task('dist-build', ['dist-clean'], function () {
  return [gulp.start('source'), gulp.start('images'), gulp.start('font'), gulp.start('html')];
});

gulp.task('dist', ['dist-build']);
