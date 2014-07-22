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
    app :{
      scripts: {
        source: [
            'app/vendor/jquery/jquery.min.js',
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
            'app/vendor/datetime/bootstrap-datepicker.zh-CN.js',
            'app/styles/theme/ace/scripts/ace-element.min.js',
            'app/styles/theme/ace/scripts/ace.min.js',
            'app/styles/theme/ace/scripts/ace-extra.min.js',
            'app/vendor/jq-upload/jquery-upload.min.js',
            'app/vendor/image-gallery/gallery.min.js',
            'app/scripts/app.js',
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
            'app/scripts/factorys/BaseFactory.js',
            'app/scripts/factorys/AccountFactory.js',
            'app/scripts/factorys/NavigatorFactory.js',
            'app/scripts/factorys/ProductFactory.js',
            'app/scripts/factorys/AnalysisFactory.js',
            'app/scripts/factorys/NewsFactory.js',
            'app/scripts/factorys/ProductCategoryFactory.js',
            'app/scripts/factorys/NewsCategoryFactory.js',
            'app/scripts/factorys/ProductTagFactory.js',
            'app/scripts/factorys/AlbumFactory.js',
            'app/scripts/factorys/PictureFactory.js',
            'app/scripts/factorys/CertificateFactory.js',
            'app/scripts/factorys/RecruitFactory.js',
            'app/scripts/factorys/SubmemberFactory.js',
            'app/scripts/factorys/InquiryFactory.js',
            'app/scripts/factorys/MessageFactory.js',
            'app/scripts/factorys/SupplyFactory.js',
            'app/scripts/factorys/SeoTemplateFactory.js',
            'app/scripts/factorys/UserDefinedFactory.js'
        ],
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
                'app/scripts/factorys/BaseFactory.js',
                'app/scripts/factorys/AccountFactory.js',
                'app/scripts/factorys/NavigatorFactory.js',
                'app/scripts/factorys/ProductFactory.js',
                'app/scripts/factorys/AnalysisFactory.js',
                'app/scripts/factorys/NewsFactory.js',
                'app/scripts/factorys/ProductCategoryFactory.js',
                'app/scripts/factorys/NewsCategoryFactory.js',
                'app/scripts/factorys/ProductTagFactory.js',
                'app/scripts/factorys/AlbumFactory.js',
                'app/scripts/factorys/PictureFactory.js',
                'app/scripts/factorys/CertificateFactory.js',
                'app/scripts/factorys/RecruitFactory.js',
                'app/scripts/factorys/SubmemberFactory.js',
                'app/scripts/factorys/InquiryFactory.js',
                'app/scripts/factorys/MessageFactory.js',
                'app/scripts/factorys/SupplyFactory.js',
                'app/scripts/factorys/SeoTemplateFactory.js',
                'app/scripts/factorys/UserDefinedFactory.js',
                'app/scripts/directives/ui-bootstrap/ui.bootstrap.tabs.js',
                'app/scripts/directives/ui-bootstrap/ui.bootstrap.tooltip.js',
                'app/scripts/directives/ui-bootstrap/ui.bootstrap.modal.js',
                'app/scripts/directives/ng-treeview/scripts/ui.bootstrap.treeview.js',
                'app/scripts/directives/angular-ueditor/ng-ueditor.src.js'],
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
            source: ['app/vendor/image-gallery/jquery.blueimp-gallery.min.js',
                'app/vendor/image-gallery/bootstrap-image-gallery.js'],
            dist: 'app/vendor/image-gallery',
            name: 'gallery.min.js'
        }
    },
    Account: {
        scripts:{
            source: ['app/vendor/jquery/jquery.min.js',
                'app/scripts/utils/Est.min.js',
                'app/vendor/angular-custom/angular.js',
                'app/vendor/bootstrap/bootstrap.min.js',
                'app/vendor/angular-resource/angular-resource.min.js',
                'app/vendor/angular-route/angular-route.min.js',
                'app/vendor/angular-ui-router/release/angular-ui-router.min.js',
                'app/vendor/angular-animate/angular-animate.min.js',
                'app/modules/Account/app.js',
                'app/scripts/factorys/BaseFactory.js',
                'app/scripts/factorys/AccountFactory.js'],
            dist: 'app/modules/Account',
            name: 'app.min.js'
        },
        doc: {
            source: ['app/scripts/utils/Est.source.js','app/scripts/factorys/AccountFactory.js', 'app/modules/Account/app.js'],
            dist: 'app/modules/Account/doc'
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
                              /*  .pipe(jshint())
                                .pipe(jshint.reporter(stylish))*/
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


gulp.task('app', function(){
    doTask('app', true);
});
gulp.task('app.min', function(){
    doTask('app', false);
});
gulp.task('doc', function(){
    doTask('doc', false);
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
gulp.task('fileupload', function(){
    doTask('fileupload', true);
});
gulp.task('fileupload.min', function(){
    doTask('fileupload', false);
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


// 登录注册
gulp.task('Account', function(){
    doTask('Account', true);
});
gulp.task('Account.min', function(){
    doTask('Account', false);
});

gulp.task('default', [ 'normal']);
gulp.task('watch.min', function(){
    gulp.watch(paths.fileupload.scripts.source, ['fileupload.min']);
    gulp.watch(paths.acejs.scripts.source, ['acejs.min']);
    gulp.watch(paths.ueditor.scripts.source, ['ueditor.min']);
    gulp.watch(paths.gallery.scripts.source, ['gallery.min']);
    gulp.watch(paths.acecss.styles.source, ['acecss.min']);
});
gulp.task('watch', function(){
    gulp.watch(paths.fileupload.scripts.source, ['fileupload']);
    gulp.watch(paths.acejs.scripts.source, ['acejs']);
    gulp.watch(paths.ueditor.scripts.source, ['ueditor']);
    gulp.watch(paths.gallery.scripts.source, ['gallery']);
    gulp.watch(paths.acecss.styles.source, ['acecss']);
});

gulp.task('css', ['acecss']);
gulp.task('css.min', ['acecss.min']);

gulp.task('js', ['fileupload', 'ueditor', 'gallery']);
gulp.task('js.min', ['fileupload.min', 'ueditor.min', 'gallery.min']);

gulp.task('all', ['watch', 'js', 'css']);
gulp.task('all.min', ['watch.min', 'js.min', 'css.min']);