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
    },
    controllers: {
        scripts: {
            source: ['app/scripts/controllers/header.js',
                'app/modules/MainPage/controllers/main.js',
                'app/scripts/controllers/message.js',
                'app/modules/Account/account.js',
                'app/modules/Account/controllers/login.js',
                'app/modules/Account/controllers/register.js',
                'app/modules/Account/controllers/info.js',
                'app/modules/News/controllers/news.js',
                'app/modules/Product/controllers/product.js',
                'app/modules/Product/controllers/ProductCtrl.js',
                'app/modules/Product/controllers/ProductAddCtrl.js',
                'app/modules/Product/controllers/ProductCateCtrl.js',
                'app/modules/Product/controllers/ProductTagCtrl.js',
                'app/modules/Supply/controllers/supply.js',
                'app/modules/Wwy/controllers/wwy.js',
                'app/modules/Bind/controllers/bind.js',
                'app/modules/Certificate/controllers/certificate.js',
                'app/modules/Recruit/controllers/recruit.js',
                'app/modules/Customer/controllers/customer.js' ,
                'app/modules/Tool/controllers/tools.js' ,
                'app/modules/Upload/scripts/upload.js' ,
                'app/modules/Upload/scripts/gallery.js' ,
                'app/scripts/api/api.js'],
            dist: 'app/scripts/controllers',
            name: 'controllers.min.js'
        }
    },
    fileupload: {
        scripts: {
            source: ['app/modules/Upload/vendor/jq-upload/jquery.ui.widget.js',
                'app/modules/Upload/vendor/jq-upload/load-image.min.js',
                'app/modules/Upload/vendor/jq-upload/jquery.xdr-transport.js',
                'app/modules/Upload/vendor/jq-upload/jquery.iframe-transport.js',
                'app/modules/Upload/vendor/jq-upload/jquery.fileupload.js',
                'app/modules/Upload/vendor/jq-upload/jquery.fileupload-process.js',
                'app/modules/Upload/vendor/jq-upload/jquery.fileupload-image.js',
                'app/modules/Upload/vendor/jq-upload/jquery.fileupload-audio.js',
                'app/modules/Upload/vendor/jq-upload/jquery.fileupload-video.js',
                'app/modules/Upload/vendor/jq-upload/jquery.fileupload-validate.js',
                'app/modules/Upload/vendor/jq-upload/jquery.fileupload-angular.js'
            ],
            dist: 'app/modules/Upload/vendor/jq-upload',
            name: 'jquery-upload.min.js'
        }
    },
    acejs: {
        scripts: {
            source: ['app/styles/theme/ace/scripts/ace-elements.min.js',
                'app/styles/theme/ace/scripts/ace.min.js',
                'app/styles/theme/ace/scripts/ace-extra.min.js'],
            dist: 'app/styles/theme/ace/scripts',
            name: 'ace.merge.min.js'
        }
    },
    acecss: {
        styles: {
            source: ['app/styles/theme/ace/jhw.min.css',
                'app/styles/theme/ace/jhw-rtl.css',
                'app/styles/theme/ace/jhw-skins.css',
                'app/styles/theme/ace/blueimp-gallery.min.css',
                'app/styles/theme/ace/bootstrap-image-gallery.min.css',
                'app/styles/theme/ace/ng-table.css'
            ],
            dist: 'app/styles/theme/ace',
            name: 'jhw.merge.min.css'
        }
    },
    ueditor: {
        scripts:{
            source: ['app/vendor/ueditor1_4_3/ueditor.config.js',
                'app/vendor/ueditor1_4_3/ueditor.all.min.js',
                'app/vendor/ueditor1_4_3/lang/zh-cn/zh-cn.js'],
            dist: 'app/vendor/ueditor1_4_3',
            name: 'ueditor.merge.min.js'
        }
    },
    gallery: {
        scripts: {
            source: ['app/modules/Upload/vendor/image-gallery/jquery.blueimp-gallery.min.js',
                'app/modules/Upload/vendor/image-gallery/bootstrap-image-gallery.js'],
            dist: 'app/modules/Upload/vendor/image-gallery',
            name: 'gallery.min.js'
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
gulp.task('controllers', function(){
    doTask('controllers', true);
});
gulp.task('controllers.min', function(){
    doTask('controllers', false);
});
gulp.task('fileupload', function(){
    doTask('fileupload', true);
});
gulp.task('fileupload.min', function(){
    doTask('fileupload', false);
});
gulp.task('acejs', function(){
    doTask('acejs', true);
});
gulp.task('acejs.min', function(){
    doTask('acejs', false);
});
gulp.task('ueditor', function(){
    doTask('ueditor', true);
});
gulp.task('ueditor.min', function(){
    doTask('ueditor', false);
});
gulp.task('gallery', function(){
    doTask('gallery', true);
});
gulp.task('gallery.min', function(){
    doTask('gallery', false);
});

gulp.task('acecss', function(){
    doTask('acecss', true);
});
gulp.task('acecss.min', function(){
    doTask('acecss', false);
});
gulp.task('default', [ 'normal']);
gulp.task('watch.min', function(){
    gulp.watch(paths.controllers.scripts.source, ['controllers.min']);
    gulp.watch(paths.fileupload.scripts.source, ['fileupload.min']);
    gulp.watch(paths.acejs.scripts.source, ['acejs.min']);
    gulp.watch(paths.ueditor.scripts.source, ['ueditor.min']);
    gulp.watch(paths.gallery.scripts.source, ['gallery.min']);
    gulp.watch(paths.acecss.styles.source, ['acecss.min']);
});
gulp.task('watch', function(){
    gulp.watch(paths.controllers.scripts.source, ['controllers']);
    gulp.watch(paths.fileupload.scripts.source, ['fileupload']);
    gulp.watch(paths.acejs.scripts.source, ['acejs']);
    gulp.watch(paths.ueditor.scripts.source, ['ueditor']);
    gulp.watch(paths.gallery.scripts.source, ['gallery']);
    gulp.watch(paths.acecss.styles.source, ['acecss']);
});
gulp.task('js.min', ['controllers.min', 'fileupload.min', 'acejs.min', 'ueditor.min', 'gallery.min']);
gulp.task('css.min', ['acecss.min']);
gulp.task('js', ['controllers', 'fileupload', 'acejs', 'ueditor', 'gallery']);
gulp.task('css', ['acecss']);
gulp.task('all', ['watch', 'js', 'css']);
gulp.task('all.min', ['watch.min', 'js.min', 'css.min']);