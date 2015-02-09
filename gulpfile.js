var gulp = require('gulp');

/** 项目发布相关 */
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var imagemin = require('gulp-imagemin');
var minifyCSS = require('gulp-minify-css');
var usemin = require('gulp-usemin');
var htmlmin = require('gulp-htmlmin');
var rev = require('gulp-rev');
var del = require('del');

/** 打包压缩相关 */
var coffee = require('gulp-coffee');
var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');
var yuidoc = require("gulp-yuidoc");
var bower = require('gulp-bower');
var wiredep = require('wiredep').stream;

/** 辅助相关 */
var connect = require('gulp-webserver');
var livereload = require('gulp-livereload');

/** ==================================================== 项目发布 ====================================================*/

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

gulp.task('usemin', function () {
  return gulp.src(src.html)
    .pipe(usemin({
      css: [minifyCSS(), 'concat'],
      html: [htmlmin({empty: true})],
      js: [uglify(), rev()]
    }))
    .pipe(gulp.dest(DISTDIR));
});

// 清除dist目录
gulp.task('dist-clean', function (callback) {
  del(dist.all, callback);
});
// 移动文件
gulp.task('moveFiles', function () {
  return gulp.src(src.all).pipe(gulp.dest(DISTDIR));
});
// 项目发布
gulp.task('publish', ['dist-clean'],
  function () {
    return [gulp.start('moveFiles'), gulp.start('usemin')];
  });


/** ========================================== 辅助开发 ==============================================================*/

gulp.task('livereload', function () {    // livereload，是自定义的，写成live或者别的也行
  var server = livereload();
  // app/**/*.*的意思是 app文件夹下的 任何文件夹 的 任何文件
  gulp.watch('app/**/*.*', function (file) {
    server.changed(file.path);
  });
  gulp.watch('doc/**/*.*', function (file) {
    server.changed(file.path);
  });
  gulp.watch('test/**/*.*', function (file) {
    server.changed(file.path);
  });
});

// 使用connect启动一个Web服务器
gulp.task('connect', function () {
  console.log('启动浏览器');
  gulp.src(['test'])
    .pipe(connect({
      host: 'example.com',
      port: 9004,
      livereload: true,
      directoryListing: true,
      open: true
    }));

  console.log('启动浏览器自动刷新');
  gulp.start('livereload');
});

gulp.task('html', function () {
  gulp.src('./test/*.html')
    .pipe(connect.reload());
});

/** ========================================== 压缩打包 ==============================================================*/

var paths = {
  jhw: {
    scripts: {
      source: [
        'app/vendor/jquery/jquery.min.js',
        'app/vendor/angular-custom/angular.js',
        'app/vendor/bootstrap/bootstrap.js',
        'app/scripts/utils/Est.source.js',
        'app/vendor/zeroclipboard/ZeroClipboard.js', // required: swf/ZeroClipboard.swf
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
        // app
        'app/modules/jhw_v2/app.js',
        // directives
        'app/angular/directives/ng-loading/ng-loading.js', // angular初始化之前显示loading图标
        'app/angular/directives/ng-datetimepicker/ng-datetimepicker.js', // 时间选择器 requied: 'app/vendor/datetime/bootstrap-datepicker.min.js','app/vendor/datetime/bootstrap-datepicker.zh-CN.js',
        'app/angular/directives/ng-imagesCrop/ng-imageCrop.js', // 图片等比例居中显示
        'app/angular/directives/ng-clickToEdit/ng-clickToEdit.js', // 点击编辑
        'app/angular/directives/ng-embedSrc/ng-embedSrc.js', // flash src地址
        'app/angular/directives/ng-enter/ng-enter.js', // 回车事件
        'app/angular/directives/ng-focus/ng-focus.js', // 获取焦点
        'app/angular/directives/ng-format/ng-format.js', // 格式化输入的内容
        'app/angular/directives/ng-ZeroClipboard/ng-ZeroClipboard.js', // required: ZeroClipboard.js
        'app/angular/directives/ng-ueditor/ng-ueditor.src.js', // required: vendor/ueditor1_4_3/ueditor.merge.min.js
        'app/angular/directives/ng-treeview/scripts/ui.bootstrap.treeview.js', // 树
        'app/angular/directives/ui-bootstrap/*.js', // 包含modal   tabs    tooltip
        'app/angular/directives/ng-toastr/angular-toastr.js', // 气泡提示
        // filters
        'app/angular/filters/filter-state/filter-state.js', // 状态
        'app/angular/filters/filter-picsize/filter-picsize.js', // 压缩图片尺寸
        'app/angular/filters/filter-characters/filter-characters.js', // 字符串截取
        // factorys
        'app/angular/factorys/*.js'
      ],
      dist: 'app/angular',
      name: 'app.min.js'
    }
  },
  Account: {
    scripts: {
      source: [
        'app/vendor/jquery/jquery.min.js',
        'app/scripts/utils/Est.min.js',
        'app/vendor/angular-custom/angular.js',
        'app/vendor/bootstrap/bootstrap.min.js',
        'app/vendor/angular-resource/angular-resource.min.js',
        'app/vendor/angular-route/angular-route.min.js',
        'app/vendor/angular-ui-router/release/angular-ui-router.min.js',
        'app/vendor/angular-animate/angular-animate.min.js',
        'app/vendor/angular-cookies/angular-cookies.min.js',
        'app/modules/Account/app.js',
        'app/angular/factorys/BaseFactory.js',
        'app/angular/factorys/AccountFactory.js'
      ],
      dist: 'app/modules/Account',
      name: 'app.min.js'
    },
    doc: {
      source: ['app/scripts/utils/Est.source.js', 'app/angular/factorys/AccountFactory.js', 'app/modules/Account/app.js'],
      dist: 'app/modules/Account/doc'
    }
  },
  Design: {
    scripts: {
      source: [
        // base
        'app/vendor/jquery/jquery.min.js',
        'app/scripts/utils/Est.min.js',
        'app/vendor/angular-custom/angular.js',
        'app/vendor/angular-resource/angular-resource.min.js',
        'app/vendor/angular-route/angular-route.min.js',
        'app/vendor/angular-ui-router/release/angular-ui-router.min.js',
        'app/vendor/angular-cookies/angular-cookies.min.js',
        // app
        'app/modules/Design/app.js',
        'app/modules/Design/config.js',
        // directives
        'app/angular/directives/ui-bootstrap/*.js',
        'app/angular/directives/ng-ueditor/ng-ueditor.src.js', // required: vendor/ueditor1_4_3/ueditor.merge.min.js
        // factorys
        'app/angular/factorys/BaseFactory.js',
        'app/angular/factorys/AccountFactory.js',
        'app/angular/factorys/ProductCategoryFactory.js',
        'app/angular/factorys/NewsCategoryFactory.js',
        'app/angular/factorys/DesignFactory.js'
      ],
      dist: 'app/modules/Design',
      name: 'app.min.js'
    }
  },
  patch: {
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
  Est: {
    scripts: {
      source: ['app/scripts/utils/Est.source.js'],
      dist: 'app/scripts/utils',
      name: 'Est.min.js'
    }
  },
  Ext: {
    scripts: {
      source: ['app/vendor/Ext/sencha-touch-all-debug.js'],
      dist: 'app/vendor/Ext',
      name: 'sencha-touch-all-min.js'
    }
  },
  Canvas: {
    scripts: {
      source: ['app/scripts/utils/Canvas.source.js'],
      dist: 'app/scripts/utils',
      name: 'Canvas.min.js'
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
        'app/styles/theme/ace/blueimp-gallery.min.css', // 图片上传
        'app/styles/theme/ace/bootstrap-image-gallery.min.css', // 相册图片弹出框样式
        'app/styles/theme/ace/ng-table.css', // 列表
        'app/angular/directives/ng-toastr/angular-toastr.css' // 气泡提示
      ],
      dist: 'app/styles/theme/ace',
      name: 'jhw.merge.min.css'
    }
  },
  ueditor: {
    scripts: {
      source: ['app/vendor/ueditor1_4_3/ueditor.config.js',
        'app/vendor/ueditor1_4_3/ueditor.all.js',
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
  seditor: {
    scripts: {
      source: ['app/vendor/seditor/src/seditorutil.js', 'app/vendor/seditor/src/seditor.js'],
      dist: 'app/vendor/seditor/src',
      name: 'seditor.min.js'
    },
    styles: {
      source: ['app/vendor/seditor/themes/default/seditor.css'
      ],
      dist: 'app/vendor/seditor/themes/default',
      name: 'seditor.min.css'
    }
  },
  drawcanvas: {
    scripts: {
      source: ['./app/vendor/drawcanvas/drawcanvas.js'],
      dist: './app/vendor/drawcanvas',
      name: 'drawcanvas.min.js'
    }
  },
  doc: {
    doc: {
      source: [
        'app/scripts/utils/Est.source.js',
        'app/scripts/utils/Canvas.source.js',
        'app/base/*.js',
        'app/scripts/app.js',
        // directives
        'app/angular/directives/ng-loading/ng-loading.js', // angular初始化之前显示loading图标
        'app/angular/directives/ng-datetimepicker/ng-datetimepicker.js', // 时间选择器 requied: 'app/vendor/datetime/bootstrap-datepicker.min.js','app/vendor/datetime/bootstrap-datepicker.zh-CN.js',
        'app/angular/directives/ng-imagesCrop/ng-imageCrop.js', // 图片等比例居中显示
        'app/angular/directives/ng-clickToEdit/ng-clickToEdit.js', // 点击编辑
        'app/angular/directives/ng-embedSrc/ng-embedSrc.js', // flash src地址
        'app/angular/directives/ng-enter/ng-enter.js', // 回车事件
        'app/angular/directives/ng-focus/ng-focus.js', // 获取焦点
        'app/angular/directives/ng-format/ng-format.js', // 格式化输入的内容
        'app/angular/directives/ng-ZeroClipboard/ng-ZeroClipboard.js', // required: ZeroClipboard.js
        'app/angular/directives/ng-ueditor/ng-ueditor.src.js', // required: vendor/ueditor1_4_3/ueditor.merge.min.js
        'app/angular/directives/ng-treeview/scripts/ui.bootstrap.treeview.js', // 树
        'app/angular/directives/ui-bootstrap/*.js', // 包含modal   tabs    tooltip
        // filters
        'app/angular/filters/filter-state/filter-state.js', // 状态
        'app/angular/filters/filter-picsize/filter-picsize.js', // 压缩图片尺寸
        'app/angular/filters/filter-characters/filter-characters.js', // 字符串截取
        // factorys
        'app/angular/factorys/*.js'
      ],
      dist: './doc'
    }
  },
  wwy: {
    scripts: {
      source: [
        './app/vendor/jquery/jquery.js',
        './app/scripts/utils/Est.source.js',
        './app/scripts/utils/Canvas.source.js',
        './app/vendor/jquery-ui/jquery-ui.js',
        './app/vendor/fullPage/jquery.fullPage.min.js',
        './app/vendor/jquery-form/form.js',
        './app/vendor/popwin/popwin.js',
        './app/vendor/ApplicationCache/ApplicationCache.js',
        './app/vendor/android/android.js',
        './app/vendor/rotate/rotate.js',
        './app/vendor/drawCanvas/drawCanvas.js'
      ],
      name: 'base.js',
      dist: './app/modules/Wwy'
    }
  },
  jihui88: {
    scripts: {
      source: [
        'app/vendor/seajs/sea.js',
        'app/vendor/seajs/seajs-text-debug.js',
        'app/vendor/pace/pace.js'
      ],
      name: 'base.js',
      dist: './app/modules/Jihui88'
    },
    styles: {
      source: [
        './app/styles/init/init.css',
        './app/vendor/artDialog_v6/css/ui-dialog.css'
      ],
      dist: './app/modules/Jihui88',
      name: 'base.css'
    }
  },
  jihui88_angular: {
    scripts: {
      source: [
        'app/vendor/jquery/jquery.min.js',
        'app/scripts/utils/Est.min.js',
        'app/vendor/zeroclipboard/ZeroClipboard.js',
        'app/vendor/angular-custom/angular.js',
        'app/vendor/angular-resource/angular-resource.min.js',
        'app/vendor/angular-route/angular-route.min.js',
        'app/vendor/angular-ui-router/release/angular-ui-router.min.js',
        'app/vendor/angular-cookies/angular-cookies.min.js',
        'app/vendor/jq-upload/jquery-upload.min.js',
        'app/modules/Jihui88/app.js',
        'app/angular/directives/ng-ZeroClipboard/ng-ZeroClipboard.js',
        'app/angular/directives/ng-ueditor/ng-ueditor.src.js',
        'app/angular/factorys/BaseFactory.js',
        'app/angular/factorys/AccountFactory.js'
      ],
      name: 'base.js',
      dist: './app/modules/Jihui88'
    }
  },
  ProductImport: {
    scripts: {
      source: [
        './app/vendor/jquery/jquery.min.js',
        './app/scripts/utils/Est.min.js'
      ],
      name: 'base.js',
      dist: './app/modules/ProductImport'
    }
  },
  test: {
    scripts: {
      source: [
        './app/modules/Wwy/core.js'
      ],
      name: 'core.js',
      dist: './test/scripts'
    },
    styles: {
      source: [
        './test/styles/*.css'
      ],
      dist: './test/styles',
      name: 'base.css'
    },
    images: {
      source: [
        './test/images/*.*'
      ],
      dist: './test/images'
    }
  },
  userManagement: {
    scripts: {
      source: [
        'app/vendor/seajs/sea.js',
        'app/vendor/seajs/seajs-text-debug.js',
        'app/vendor/pace/pace.js',
        'app/vendor/prefix/prefixfree.min.js',
        'app/vendor/json3/json3.js',
        'app/scripts/utils/Est.source.js',
        'app/backbone/Application.js'
      ],
      name: 'base.js',
      dist: 'C:/software/WebstormProjects/userManagement/app/scripts'
    }
  },
  mobile331: {
    scripts: {
      source: [
        'app/vendor/seajs/sea.js',
        'app/vendor/seajs/seajs-text-debug.js',
        'app/modules/mobile331/Application.js'
      ],
      name: 'base.js',
      dist: 'app/modules/mobile331'
    }
  }
};
function doTask(item, debug) {
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

gulp.task('doc-clean', function (cb) {
  del(['doc'], cb);
});

/** doc */
gulp.task('doc', function () {
  doTask('doc', false);
});

/** test*/
gulp.task('test', function () {
  doTask('test', true);
});
gulp.task('test.min', function () {
  doTask('test', false);
});

/** wwy*/
gulp.task('wwy', function () {
  doTask('wwy', true);
});
gulp.task('wwy.min', function () {
  doTask('wwy', false);
});


/** acecss */
gulp.task('acecss', function () {
  doTask('acecss', true);
});
gulp.task('acecss.min', function () {
  doTask('acecss', false);
});

/** patch */
gulp.task('patch', function () {
  doTask('patch', true);
});
gulp.task('patch.min', function () {
  doTask('patch', false);
});

/** Est */
gulp.task('Est', function () {
  doTask('Est', true);
});
gulp.task('Est.min', function () {
  doTask('Est', false);
});

/** Ext */
gulp.task('Ext', function () {
  doTask('Ext', true);
});
gulp.task('Ext.min', function () {
  doTask('Ext', false);
});

/** Canvas */
gulp.task('Canvas', function () {
  doTask('Canvas', true);
});
gulp.task('Canvas.min', function () {
  doTask('Canvas', false);
});

/** fileupload */
gulp.task('fileupload', function () {
  doTask('fileupload', true);
});
gulp.task('fileupload.min', function () {
  doTask('fileupload', false);
});

/** gallery */
gulp.task('gallery', function () {
  doTask('gallery', true);
});
gulp.task('gallery.min', function () {
  doTask('gallery', false);
});

/** ueditor */
gulp.task('ueditor', function () {
  doTask('ueditor', true);
});
gulp.task('ueditor.min', function () {
  doTask('ueditor', false);
});

/** seditor */
gulp.task('seditor', function () {
  doTask('seditor', true);
});
gulp.task('seditor.min', function () {
  doTask('seditor', false);
});

/** drawcanvas */
gulp.task('drawcanvas', function () {
  doTask('drawcanvas', true);
});
gulp.task('drawcanvas.min', function () {
  doTask('drawcanvas', false);
});

/** jihui88 */
gulp.task('jihui88', function () {
  doTask('jihui88', true);
});
gulp.task('jihui88.min', function () {
  doTask('jihui88', false);
});

gulp.task('jihui881', function () {
  doTask("jihui881", true);
});
gulp.task('jihui881.min', function () {
  doTask('jihui881', false);
});
gulp.task('userManagement', function () {
  doTask("userManagement", true);
});
gulp.task('userManagement.min', function () {
  doTask('userManagement', false);
});

gulp.task('mobile331', function () {
  doTask('mobile331', true);
});
gulp.task('mobile331.min', function () {
  doTask('mobile331', false);
});

/** 全部 */
gulp.task('all', ['doc-clean', 'doc', 'acecss', 'patch', 'Est', 'fileupload', 'gallery', 'ueditor', 'seditor']);
gulp.task('all.min', ['doc-clean', 'doc', 'acecss.min', 'patch.min', 'Est.min', 'fileupload.min', 'gallery.min', 'ueditor.min', 'seditor.min']);

gulp.task('watch', function () {
  gulp.watch(paths.fileupload.scripts.source, ['fileupload']);
});

// =====================================================================================================================
/** 项目 jhw_v2  output: app -> scripts -> app.min.js*/
gulp.task('jhw', function () {
  doTask('jhw', true);
});
gulp.task('jhw.min', function () {
  doTask('jhw', false);
});

/** 项目 Account  output: app -> modules -> Account -> app.min.js*/
gulp.task('Account', function () {
  doTask('Account', true);
});
gulp.task('Account.min', function () {
  doTask('Account', false);
});

/** 项目 jhw_v2 -> modules -> Design  output: app -> modules -> Design -> app.min.js*/
gulp.task('Design', function () {
  doTask('Design', true);
});
gulp.task('Design.min', function () {
  doTask('Design', false);
});

/** 项目 jhw_v2 -> modules -> ProductImport  output: app -> modules -> ProductImport -> base.js*/
gulp.task('ProductImport', function () {
  doTask('ProductImport', true);
});
gulp.task('ProductImport.min', function () {
  doTask('ProductImport', false);
});