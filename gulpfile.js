var gulp = require('gulp');

/** 项目发布相关 */
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var imagemin = require('gulp-imagemin');
var minifyCSS = require('gulp-minify-css');
var usemin = require('gulp-usemin');
var htmlmin = require('gulp-htmlmin');
var del = require('del');

/** 打包压缩相关 */
var coffee = require('gulp-coffee');
var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');
var yuidoc = require("gulp-yuidoc");
var bower = require('gulp-bower');
var wiredep = require('wiredep').stream;

/** ==================================================== 压缩打包 ====================================================*/
var paths = {};
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

/** ace样式压缩 */
paths['acecss'] = { styles: { source: [
  'app/styles/theme/ace/jhw.min.css', 'app/styles/theme/ace/jhw-rtl.css', 'app/styles/theme/ace/jhw-skins.css',
  'app/styles/theme/ace/blueimp-gallery.min.css', 'app/styles/theme/ace/bootstrap-image-gallery.min.css',
  'app/styles/theme/ace/ng-table.css', 'app/angular/directives/ng-toastr/angular-toastr.css' ], dist: 'app/styles/theme/ace',
  name: 'jhw.merge.min.css' } };
gulp.task('acecss', function () {
  doTask('acecss', true);
});
gulp.task('acecss.min', function () {
  doTask('acecss', false);
});

/** 项目 jhw_v2  output: app -> scripts -> app.min.js*/
paths['jhw'] = { scripts: { source: [
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
  'app/angular/factorys/*.js' ], dist: 'app/angular', name: 'app.min.js' } };
gulp.task('jhw', function () {
  doTask('jhw', true);
});
gulp.task('jhw.min', function () {
  doTask('jhw', false);
});

/** 项目 Account  output: app -> modules -> Account -> app.min.js*/
paths['Account'] = { scripts: { source: [
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
], dist: 'app/modules/Account', name: 'app.min.js' }, doc: { source: [ 'app/scripts/utils/Est.source.js', 'app/angular/factorys/AccountFactory.js', 'app/modules/Account/app.js'], dist: 'app/modules/Account/doc' } };
gulp.task('Account', function () {
  doTask('Account', true);
});
gulp.task('Account.min', function () {
  doTask('Account', false);
});

/** 项目 jhw_v2 -> modules -> Design  output: app -> modules -> Design -> app.min.js*/
paths['Design'] = { scripts: { source: [
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
], dist: 'app/modules/Design', name: 'app.min.js' } };
gulp.task('Design', function () {
  doTask('Design', true);
});
gulp.task('Design.min', function () {
  doTask('Design', false);
});

/** 项目 jhw_v2 -> modules -> ProductImport  output: app -> modules -> ProductImport -> base.js*/
paths['ProductImport'] = { scripts: { source: [
  './app/vendor/jquery/jquery.min.js',
  './app/scripts/utils/Est.min.js'
], name: 'base.js', dist: './app/modules/ProductImport' } };
gulp.task('ProductImport', function () {
  doTask('ProductImport', true);
});
gulp.task('ProductImport.min', function () {
  doTask('ProductImport', false);
});

/** 低版本浏览器兼容代码 */
paths['patch'] = { scripts: { source: [
  'app/vendor/es5-shim/es5-shim.js',
  'app/vendor/json3/json3.js',
  'app/vendor/respond/respond.src.js',
  'app/vendor/html5shiv/html5shiv.js',
  'app/vendor/html5shiv/html5shiv-printshiv.js',
  'app/vendor/css3-mediaqueries/css3-mediaqueries.js'], dist: 'app/scripts/patch', name: 'patch.min.js' } };
gulp.task('patch', function () {
  doTask('patch', true);
});
gulp.task('patch.min', function () {
  doTask('patch', false);
});

/** Est */
paths['Est'] = { scripts: { source: [
  'app/scripts/utils/Est.source.js'
], dist: 'app/scripts/utils', name: 'Est.min.js' } }
gulp.task('Est', function () {
  doTask('Est', true);
});
gulp.task('Est.min', function () {
  doTask('Est', false);
});

/** Ext */
paths['Ext'] = { scripts: { source: [
  'app/vendor/Ext/sencha-touch-all-debug.js'
], dist: 'app/vendor/Ext', name: 'sencha-touch-all-min.js' } }
gulp.task('Ext', function () {
  doTask('Ext', true);
});
gulp.task('Ext.min', function () {
  doTask('Ext', false);
});

/** Canvas */
paths['Canvas'] = { scripts: { source: [
  'app/scripts/utils/Canvas.source.js'
], dist: 'app/scripts/utils', name: 'Canvas.min.js' }};
gulp.task('Canvas', function () {
  doTask('Canvas', true);
});
gulp.task('Canvas.min', function () {
  doTask('Canvas', false);
});

/** fileupload */
paths['fileupload'] = { scripts: { source: [
  'app/modules/Upload/vendor/jq-upload/jquery.ui.widget.js',
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
], dist: 'app/modules/Upload/vendor/jq-upload', name: 'jquery-upload.min.js' } }
gulp.task('fileupload', function () {
  doTask('fileupload', true);
});
gulp.task('fileupload.min', function () {
  doTask('fileupload', false);
});

/** gallery */
paths['gallery'] = { scripts: { source: [
  'app/vendor/image-gallery/jquery.blueimp-gallery.min.js',
  'app/vendor/image-gallery/bootstrap-image-gallery.js'
], dist: 'app/vendor/image-gallery', name: 'gallery.min.js' } }
gulp.task('gallery', function () {
  doTask('gallery', true);
});
gulp.task('gallery.min', function () {
  doTask('gallery', false);
});

/** ueditor */
paths['ueditor'] = { scripts: { source: [
  'app/vendor/ueditor1_4_3/ueditor.config.js',
  'app/vendor/ueditor1_4_3/ueditor.all.js',
  'app/vendor/ueditor1_4_3/lang/zh-cn/zh-cn.js'
], dist: 'app/vendor/ueditor1_4_3', name: 'ueditor.merge.min.js' } }
gulp.task('ueditor', function () {
  doTask('ueditor', true);
});
gulp.task('ueditor.min', function () {
  doTask('ueditor', false);
});

/** seditor */
paths['seditor'] = { scripts: { source: [
  'app/vendor/seditor/src/seditorutil.js', 'app/vendor/seditor/src/seditor.js'
], dist: 'app/vendor/seditor/src', name: 'seditor.min.js' },
  styles: { source: [
    'app/vendor/seditor/themes/default/seditor.css'
  ], dist: 'app/vendor/seditor/themes/default', name: 'seditor.min.css' } }
gulp.task('seditor', function () {
  doTask('seditor', true);
});
gulp.task('seditor.min', function () {
  doTask('seditor', false);
});

/** drawcanvas */
paths['drawcanvas'] = { scripts: { source: [
  './app/vendor/drawcanvas/drawcanvas.js'
], dist: './app/vendor/drawcanvas', name: 'drawcanvas.min.js' } }
gulp.task('drawcanvas', function () {
  doTask('drawcanvas', true);
});
gulp.task('drawcanvas.min', function () {
  doTask('drawcanvas', false);
});

/** jihui88 */
paths['jihui88'] = { scripts: { source: [
  'app/vendor/seajs/sea.js',
  'app/vendor/seajs/seajs-text-debug.js',
  'app/vendor/pace/pace.js'
], name: 'base.js', dist: './app/modules/Jihui88' },
  styles: { source: [
    './app/styles/init/init.css',
    './app/vendor/artDialog_v6/css/ui-dialog.css'
  ], dist: './app/modules/Jihui88', name: 'base.css' } }
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


/** ==================================================== userManagement ====================================================*/

/** 基础代码 */
paths['userManagement'] = { scripts: { source: [
  'app/vendor/seajs/sea.js',
  'app/vendor/seajs/seajs-text-debug.js',
  'app/vendor/pace/pace.js',
  'app/vendor/prefix/prefixfree.min.js',
  'app/vendor/json3/json3.js',
  'app/scripts/utils/Est.source.js',
  'app/backbone/Application.js'
], name: 'base.js', dist: 'C:/software/WebstormProjects/userManagement/app/scripts' } };
gulp.task('userManagement', function () {
  doTask("userManagement", true);
});
gulp.task('userManagement.min', function () {
  doTask('userManagement', false);
});

/** 微传单*/
paths['leaflet'] = { scripts: { source: [
  'app/vendor/seajs/sea.js',
  'app/vendor/seajs/seajs-text-debug.js',
  'app/scripts/utils/Est.source.js',
  'app/backbone/Application.js'
], name: 'base.js', dist: 'C:/software/WebstormProjects/userManagement/app/modules/leaflet' } };
gulp.task('leaflet', function () {
  doTask('leaflet', true);
});
gulp.task('leaflet.min', function () {
  doTask('leaflet', false);
});

/** 手机后台 */
paths['mobileManagement'] = { scripts: { source: [
  'app/vendor/seajs/sea.js',
  'app/vendor/seajs/seajs-text-debug.js',
  'app/scripts/utils/Est.source.js',
  'app/modules/mobileManagement/Application.js'
], name: 'base.js', dist: 'C:/software/WebstormProjects/userManagement/app/modules/mobileManagement' } }
gulp.task('mobileManagement', function () {
  doTask('mobileManagement', true);
});
gulp.task('mobileManagement.min', function () {
  doTask('mobileManagement', false);
});
