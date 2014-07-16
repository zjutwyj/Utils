var gulp = require('gulp');

var coffee = require('gulp-coffee');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var imagemin = require('gulp-imagemin');
var connect = require('gulp-connect');
var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');
var yuidoc = require("gulp-yuidoc");
var minifyCSS = require('gulp-minify-css');
var del = require('del');

var paths = {
    vendor : {
      scripts: {
          source: ['app/vendor/jquery/jquery.min.js',
              'app/vendor/angular-custom/angular.js',
              'app/vendor/bootstrap/bootstrap.js',
              'app/scripts/utils/Est.source.js',
              'app/vendor/zeroclipboard/ZeroClipboard.min.js',
              'app/vendor/angular-resource.min.js',
              'app/vendor/angular-cookies/angular-cookies.min.js',
              'app/vendor/angular-route/angular-route.min.js',
              'app/vendor/ng-table/ng-table.min.js',
              'app/vendor/angular-nestedsortable/angular-nested-sortable.min.js',
              'app/vendor/typeahead/typeahead.bundle.min.js',
              'app/vendor/datetime/bootstrap-datepicker.min.js',
              'app/vendor/datetime/bootstrap-datepicker.zh-CN.js'],
          dist: 'app/scripts/vendor',
          name: 'vendor.min.js'
      }
    },
    app :{
      scripts: {
        source: ['app/scripts/app.js',
            'app/scripts/directives/directive.js',
            'app/scripts/directives/angular-ueditor/ng-ueditor.src.js',
            'app/scripts/directives/ng-treeview/scripts/ui.bootstrap.treeview.js',
            'app/scripts/directives/ui-bootstrap/ui.bootstrap.transition.js',
            'app/scripts/directives/ui-bootstrap/ui.bootstrap.position.js',
            'app/scripts/directives/ui-bootstrap/ui.bootstrap.tabs.js',
            'app/scripts/directives/ui-bootstrap/ui.bootstrap.bindHtml.js',
            'app/scripts/directives/ui-bootstrap/ui.bootstrap.modal.js',
            'app/scripts/directives/ui-bootstrap/ui.bootstrap.tooltip.js',
            'app/scripts/filters/filter.js',
            'app/scripts/factorys/factory.js'],
          dist: 'app/scripts',
          name: 'app.min.js'
      }
    },
    patch : {
        scripts: {
            source: ['app/vendor/es5-shim/es5-shim.js',
                'app/vendor/json3/json3.js',
                'app/vendor/respond/respond.src.js',
                'app/vendor/html5shiv/html5shiv.js',
                'app/vendor/html5shiv/html5shiv-printshiv.js',
                'app/vendor/css3-mediaqueries/css3-mediaqueries.js'],
            dist: 'app/scripts/patch',
            name: 'patch.min.js'
        }
    },
    doc : {
        doc : {
            source: ['app/scripts/utils/Est.source.js',
                'app/scripts/app.js',
                'app/scripts/directives/directive.js',
                'app/scripts/filters/filter.js',
                'app/scripts/factorys/factory.js',
                'app/scripts/directives/ui-bootstrap/ui.bootstrap.tabs.js',
                'app/scripts/directives/ui-bootstrap/ui.bootstrap.tooltip.js',
            'app/scripts/directives/ui-bootstrap/ui.bootstrap.modal.js'],
            dist: './app/doc'
        }
    },
    Est : {
        scripts: {
            source: ['app/scripts/utils/Est.source.js'],
            dist: 'app/scripts/utils',
            name: 'Est.min.js'
        },
        doc: {
            source: ['app/scripts/utils/Est.source.js'],
            dist: './app/doc/Est'
        }
    }
};

function doTask(item, debug){
    for (var key in paths[item]) {
        switch (key) {
            case 'scripts':
                try {
                    gulp.task(item + key, function () {
                        if (debug) {
                            return gulp.src(paths[item].scripts.source)
                                .pipe(jshint())
                                .pipe(jshint.reporter(stylish))
                                .pipe(concat(paths[item].scripts.name))
                                .pipe(gulp.dest(paths[item].scripts.dist));
                        }
                        return gulp.src(paths[item].scripts.source)
                            .pipe(concat(paths[item].scripts.name))
                            .pipe(uglify())
                            .pipe(gulp.dest(paths[item].scripts.dist));
                    });
                    gulp.start(item + key);
                } catch (e) {
                    console.error(item + key + e);
                }
                break;

            case 'styles':
                try {
                    gulp.task(item + key, function () {
                        return gulp.src(paths[item].styles.source)
                            .pipe(minifyCSS({keepBreaks: true}))
                            .pipe(concat(paths[item].styles.name))
                            .pipe(gulp.dest(paths[item].styles.dist));
                    });
                    gulp.start(item + key);
                } catch (e) {
                    console.error(item + key + e);
                }
                break;

            case 'doc':
                try {
                    gulp.task(item + key, function () {
                        return gulp.src(paths[item].doc.source)
                            .pipe(yuidoc())
                            .pipe(gulp.dest(paths[item].doc.dist))
                    });
                    gulp.start(item + key);
                } catch (e) {
                    console.error(item + key + e);
                }
                break;

            case 'images':
                try {
                    gulp.task(item + key, function () {
                        return gulp.src(paths[item].images.source)
                            .pipe(imagemin({optimizationLevel: 5}))
                            .pipe(gulp.dest(paths[item].images.dist));
                    });
                    gulp.start(item + key);
                } catch (e) {
                    console.error(item + key + e);
                }
                break;
            default:
        }
    }
}

function startTask(debug) {
    for (var item in paths) {
        doTask(item, debug);
    }
}


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
    gulp.watch(paths, ['begin']);
});

gulp.task('Est', function(){
    doTask('Est', true);
});
gulp.task('Est.min', function(){
    doTask('Est', false);
});

gulp.task('vendor', function(){
    doTask('vendor', true);
});

gulp.task('vendor.min', function(){
    doTask('vendor', false);
});

gulp.task('app', function(){
    doTask('app', true);
});
gulp.task('doc', function(){
    doTask('doc', false);
});
gulp.task('app.min', function(){
    doTask('app', false);
});

gulp.task('patch', function(){
    doTask('patch', true);
});

gulp.task('patch.min', function(){
    doTask('patch', false);
});

gulp.task('normal', function(){
    startTask(false);
});

gulp.task('debug', function(){
    startTask(true);
});


gulp.task('default', [ 'normal']);