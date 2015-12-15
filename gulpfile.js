var gulp = require('gulp');

//** 项目发布相关 */
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var imagemin = require('gulp-imagemin');
var minifyCSS = require('gulp-minify-css');
var usemin = require('gulp-usemin');
var htmlmin = require('gulp-htmlmin');
var del = require('del');

//** 打包压缩相关 */
var coffee = require('gulp-coffee');
var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');
var yuidoc = require("gulp-yuidoc");
var bower = require('gulp-bower');
var wiredep = require('wiredep').stream;

//** ==================================================== 压缩打包 ====================================================*/
var paths = {};
var SRCDIR = './app',
  TMPDIR = './.tmp',
  DISTDIR = 'C:/software/WebstormProjects',
  src = {
    all: [SRCDIR + '/**', TMPDIR + '/**']
  },
  dist = {
    all: DISTDIR + '/**'
  };
function doTask(item, debug) {
  for (var key in paths[item]) {
    switch (key) {
      case 'scripts':
        try {
          gulp.task(item + key, function () {
            if (debug) {
              return gulp.src(paths[item].scripts.source)
                /*.pipe(jshint())
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

//** ace样式压缩 */
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

//** 项目 jhw_v2  output: app -> scripts -> app.min.js*/
paths['jhw'] = { scripts: { source: [
  'app/vendor/jquery/jquery.min.js',
  'app/vendor/angular-custom/angular.js',
  'app/vendor/bootstrap/bootstrap.js',
  'app/Est/Est.min.js',
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

//** 项目 Account  output: app -> modules -> Account -> app.min.js*/
paths['Account'] = { scripts: { source: [
  'app/vendor/jquery/jquery.min.js',
  'app/Est/Est.min.js',
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
], dist: 'app/modules/Account', name: 'app.min.js' }, doc: { source: [ 'app/Est/Est.min.js', 'app/angular/factorys/AccountFactory.js', 'app/modules/Account/app.js'], dist: 'app/modules/Account/doc' } };
gulp.task('Account', function () {
  doTask('Account', true);
});
gulp.task('Account.min', function () {
  doTask('Account', false);
});

//** 项目 jhw_v2 -> modules -> Design  output: app -> modules -> Design -> app.min.js*/
paths['Design'] = { scripts: { source: [
  // base
  'app/vendor/jquery/jquery.min.js',
  'app/Est/Est.min.js',
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

//** 项目 jhw_v2 -> modules -> ProductImport  output: app -> modules -> ProductImport -> base.js*/
paths['ProductImport'] = { scripts: { source: [
  './app/vendor/jquery/jquery.min.js',
  './app/Est/Est.min.js'
], name: 'base.js', dist: './app/modules/ProductImport' } };
gulp.task('ProductImport', function () {
  doTask('ProductImport', true);
});
gulp.task('ProductImport.min', function () {
  doTask('ProductImport', false);
});

//** 低版本浏览器兼容代码 */
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

//** Est */
paths['Est'] = { scripts: { source: [
  'app/Est/Est.source.js'
], dist: 'app/Est', name: 'Est.min.js' } }
gulp.task('Est', function () {
  doTask('Est', true);
});
gulp.task('Est.min', function () {
  doTask('Est', false);
});

//** Ext */
paths['Ext'] = { scripts: { source: [
  'app/vendor/Ext/sencha-touch-all-debug.js'
], dist: 'app/vendor/Ext', name: 'sencha-touch-all-min.js' } }
gulp.task('Ext', function () {
  doTask('Ext', true);
});
gulp.task('Ext.min', function () {
  doTask('Ext', false);
});

//** Canvas */
paths['Canvas'] = { scripts: { source: [
  'app/scripts/utils/Canvas.source.js'
], dist: 'app/scripts/utils', name: 'Canvas.min.js' }};
gulp.task('Canvas', function () {
  doTask('Canvas', true);
});
gulp.task('Canvas.min', function () {
  doTask('Canvas', false);
});

//** fileupload */
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

//** gallery */
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

//** ueditor */
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

//** seditor */
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

//** drawcanvas */
paths['drawcanvas'] = { scripts: { source: [
  './app/vendor/drawcanvas/drawcanvas.js'
], dist: './app/vendor/drawcanvas', name: 'drawcanvas.min.js' } }
gulp.task('drawcanvas', function () {
  doTask('drawcanvas', true);
});
gulp.task('drawcanvas.min', function () {
  doTask('drawcanvas', false);
});

//** jihui88 */
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
//==============================================================================================================
//** 用户后台 - 基础代码 */ */
paths['UserManagement_base'] = { scripts: { source: [
  'app/vendor/seajs/sea.js',
  'app/vendor/seajs/seajs-text-debug.js',
  'app/vendor/pace/pace.js',
  'app/vendor/prefix/prefixfree.min.js',
  'app/vendor/json3/json3.js',

  'app/vendor/jquery/jquery-1.10.2.js',
  'app/Est/Est.min.js',
  'app/vendor/underscore/underscore.js',
  'app/vendor/backbone/backbone-debug.js',
  'app/vendor/handlebars/handlebars-debug.js',
  'app/handlebars/HandlebarsHelper.js',

  'app/backbone/src/Application.js',
  'app/backbone/src/BaseUtils.js',
  'app/backbone/src/BaseService.js',
  'app/backbone/src/SuperView.js',
  'app/backbone/src/BaseView.js',
  'app/backbone/src/BaseList.js',
  'app/backbone/src/BaseItem.js',
  'app/backbone/src/BaseCollection.js',
  'app/backbone/src/BaseModel.js',
  'app/backbone/src/BaseDetail.js'

], name: 'base.js', dist: 'C:/software/WebstormProjects/UserManagement/app/scripts' } };
gulp.task('UserManagement_base', function () {
  doTask("UserManagement_base", true);
});
gulp.task('UserManagement_base.min', function () {
  doTask('UserManagement_base', false);
});

paths['UserManagement_doc'] = { doc: { source: [
  'app/backbone/src/*.*',
  'app/handlebars/HandlebarsHelper.js',
  'app/Est/Est.min.js',
  'app/appjs_v3/Application.js'
], dist: 'C:/software/WebstormProjects/UserManagement/doc' } }
gulp.task('UserManagement_doc', function () {
  doTask('UserManagement_doc', false);
});

//** 用户后台 打包*/
gulp.task('UserManagement.min', function () {
  return [gulp.start('UserManagement_base.min'), gulp.start('UserManagement_doc')];
});
gulp.task('UserManagement', function () {
  return [gulp.start('UserManagement_base'), gulp.start('UserManagement_doc')];
});
//==============================================================================================================
//** 微传单 打包*/
paths['UserManagement_leaflet'] = { scripts: { source: [
  'app/vendor/seajs/sea.js',
  'app/vendor/seajs/seajs-text-debug.js',
  'app/Est/Est.min.js',
  'app/backbone/src/Application.js',
  'app/vendor/handlebars/handlebars-debug.js',
  'app/handlebars/HandlebarsHelper.js'
], name: 'base.js', dist: 'C:/software/WebstormProjects/UserManagement/app/modules/wwy/leaflet/website/scripts' } };
gulp.task('UserManagement_leaflet', function () {
  doTask('UserManagement_leaflet', true);
});
gulp.task('UserManagement_leaflet.min', function () {
  doTask('UserManagement_leaflet', false);
});
//** 微传单第二版 打包*/
paths['UserManagement_leaflet_v2'] = { scripts: { source: [
  'app/vendor/seajs/sea.js',
  'app/vendor/seajs/seajs-text-debug.js',
  'app/Est/Est.min.js',
  'app/backbone/src/Application.js',
  'app/vendor/handlebars/handlebars-debug.js',
  'app/handlebars/HandlebarsHelper.js',
  'app/vendor/zepto/zepto.min.js',
  'app/vendor/fullPage/FullPage.js'
], name: 'base.js', dist: 'C:/software/WebstormProjects/UserManagement/app/modules/wwy/leaflet_v2/website/scripts' } };
gulp.task('UserManagement_leaflet_v2', function () {
  doTask('UserManagement_leaflet_v2', true);
});
gulp.task('UserManagement_leaflet_v2.min', function () {
  doTask('UserManagement_leaflet_v2', false);
});
//==============================================================================================================
//** 手机后台 - base.js */
paths['UserManagement_mobileManagement_base'] = { scripts: { source: [
  'app/vendor/seajs/sea.js',
  'app/vendor/seajs/seajs-text-debug.js',
  'app/Est/Est.min.js',
  'app/appjs_v3/Application.js',
  'app/vendor/handlebars/handlebars-debug.js',
  'app/handlebars/HandlebarsHelper.js'
], name: 'base.js', dist: 'C:/software/WebstormProjects/UserManagement/app/modules/mobile/mobileManagement/scripts' } }
gulp.task('UserManagement_mobileManagement_base', [], function () {
  doTask('UserManagement_mobileManagement_base', true);
});
gulp.task('UserManagement_mobileManagement_base.min', [], function () {
  doTask('UserManagement_mobileManagement_base', false);
});
//** 手机后台 - App.js */
paths['UserManagement_appjs_merge'] = {
  scripts: { source: ['app/appjs_v3/zepto.min.js', 'app/vendor/zepto/fx.js',
    'app/appjs_v3/lib/clickable.js', 'app/appjs_v3/lib/swapper.js', 'app/appjs_v3/lib/scrollable.js',
    'app/appjs_v3/app.js', 'app/appjs_v3/utils.js', 'app/appjs_v3/dialog.js', 'app/appjs_v3/events.js',
    'app/appjs_v3/metrics.js', 'app/appjs_v3/scroll.js', 'app/appjs_v3/scroll-fix.js', 'app/appjs_v3/pages.js', 'app/appjs_v3/stack.js',
    'app/appjs_v3/transitions.js', 'app/appjs_v3/navigation.js' , 'app/appjs_v3/android-touch-fix', 'app/appjs_v3/custom.js'
  ], dist: 'app/appjs_v3', name: 'app.min.js' }
}
gulp.task('UserManagement_appjs_merge', ['UserManagement_mobileManagement_base'], function () {
  doTask('UserManagement_appjs_merge', true);
});
gulp.task('UserManagement_appjs_merge.min', ['UserManagement_mobileManagement_base.min'], function () {
  doTask('UserManagement_appjs_merge', false);
});
//** 手机后台 - 包装App.js */
paths['UserManagement_appjs_wrap'] = {
  scripts: { source: [
    'app/appjs_v3/define_pre.js',
    'app/appjs_v3/app.min.js',
    'app/appjs_v3/define_last.js'
  ], dist: 'C:/software/WebstormProjects/UserManagement/app/vendor/appjs', name: 'App.js' },
  styles: { source: [
    'app/appjs_v3/stylesheet/base.css'
  ], name: 'base.css', dist: 'C:/software/WebstormProjects/UserManagement/app/modules/mobile/mobileManagement/styles'
  }
}
gulp.task('UserManagement_appjs_wrap', ['UserManagement_appjs_merge'], function () {
  doTask('UserManagement_appjs_wrap', true);
});
gulp.task('UserManagement_appjs_wrap.min', ['UserManagement_appjs_merge.min'], function () {
  doTask('UserManagement_appjs_wrap', false);
});
//** 手机后台 - 打包 */
gulp.task('UserManagement_mobileManagement.min', ['UserManagement_appjs_wrap.min'], function () {
});
gulp.task('UserManagement_mobileManagement', ['UserManagement_appjs_wrap'], function () {
});
//===============================================================================================================
paths['Leaflet_doc'] = { doc: { source: [
  'app/backbone/src/*.*',
  'app/handlebars/HandlebarsHelper.js',
  'app/Est/Est.source.js',
  'C:/software/WebstormProjects/Leaflet/app/modules/design/controllers/DesignCenter.js'
], dist: 'C:/software/WebstormProjects/Leaflet/doc' } }
gulp.task('Leaflet_doc', [], function () {
  doTask('Leaflet_doc', false);
});

paths['Leaflet_base'] = { scripts: { source: [
  'app/vendor/seajs/sea-debug.js',
  'app/vendor/seajs/seajs-text-debug.js',
  'app/vendor/json3/json3.js',

  'app/vendor/jquery/jquery-1.10.2.js',
  'app/Est/Est.source.js',
  'app/vendor/underscore/underscore.js',
  'app/vendor/backbone/backbone-debug.js',
  'app/vendor/handlebars/handlebars-debug.js',
  'app/handlebars/HandlebarsHelper.js',

  'app/backbone/src/Application.js',
  'app/backbone/src/BaseUtils.js',
  'app/backbone/src/BaseService.js',
  'app/backbone/src/SuperView.js',
  'app/backbone/src/BaseView.js',
  'app/backbone/src/BaseList.js',
  'app/backbone/src/BaseItem.js',
  'app/backbone/src/BaseCollection.js',
  'app/backbone/src/BaseModel.js',
  'app/backbone/src/BaseDetail.js'

], name: 'base.js', dist: 'C:/software/WebstormProjects/Leaflet/app/scripts' } };
gulp.task('Leaflet_base', ['Leaflet_doc'], function () {
  doTask('Leaflet_base', true);
});
gulp.task('Leaflet_base.min', ['Leaflet_doc'], function () {
  doTask('Leaflet_base', false);
});
// 静态页面
paths['Leaflet_website_base'] = { scripts: { source: [
  'app/vendor/seajs/sea.js',
  'app/vendor/seajs/seajs-text-debug.js',
  'app/Est/Est.source.js',
  'app/backbone/src/Application.js',
  'app/vendor/handlebars/handlebars-debug.js',
  'app/handlebars/HandlebarsHelper.js',
  'app/vendor/zepto/zepto.min.js'
], name: 'base.js', dist: 'C:/software/WebstormProjects/Leaflet/app/modules/website/scripts' } };
gulp.task('Leaflet_website_base', ['Leaflet_base'], function () {
  doTask('Leaflet_website_base', true);
});
gulp.task('Leaflet_website_base.min', ['Leaflet_base.min'], function () {
  doTask('Leaflet_website_base', false);
});

gulp.task('Leaflet', ['Leaflet_website_base'], function () {
});
gulp.task('Leaflet.min', ['Leaflet_website_base.min'], function () {
});


// 手机外观设计
paths['MobileSite_doc'] = { doc: { source: [
  'app/backbone/src/*.*',
  'app/handlebars/HandlebarsHelper.js',
  'app/Est/Est.source.js',
  'C:/software/WebstormProjects/MobileSite/app/modules/design/controllers/DesignCenter.js'
], dist: 'C:/software/WebstormProjects/MobileSite/doc' } }
gulp.task('MobileSite_doc', [], function () {
  doTask('MobileSite_doc', false);
});

paths['MobileSite_base'] = { scripts: { source: [
  'app/vendor/seajs/sea-debug.js',
  'app/vendor/seajs/seajs-text-debug.js',
  'app/vendor/json3/json3.js',

  'app/vendor/jquery/jquery-1.10.2.js',
  'app/Est/Est.source.js',
  'app/vendor/underscore/underscore.js',
  'app/vendor/backbone/backbone-debug.js',
  'app/vendor/handlebars/handlebars-debug.js',
  'app/handlebars/HandlebarsHelper.js',

  'app/backbone/src/Application.js',
  'app/backbone/src/BaseUtils.js',
  'app/backbone/src/BaseService.js',
  'app/backbone/src/SuperView.js',
  'app/backbone/src/BaseView.js',
  'app/backbone/src/BaseList.js',
  'app/backbone/src/BaseItem.js',
  'app/backbone/src/BaseCollection.js',
  'app/backbone/src/BaseModel.js',
  'app/backbone/src/BaseDetail.js'

], name: 'base.js', dist: 'C:/software/WebstormProjects/MobileSite/app/scripts' } };
gulp.task('MobileSite_base', ['MobileSite_doc'], function () {
  doTask('MobileSite_base', true);
});
gulp.task('MobileSite_base.min', ['MobileSite_doc'], function () {
  doTask('MobileSite_base', false);
});
gulp.task('MobileSite', ['MobileSite_base'], function () {
});
gulp.task('MobileSite.min', ['MobileSite_base.min'], function () {
});

// [0].Est工具类库 Est.min
// [1].用户后台 UserManagement.min
// [2].微传单 UserManagement_leaflet.min
// [3].微传单 第二版 UserManagement_leaflet_v2.min
// [4].手机后台 UserManagement_mobileManagement.min
// [5].微传单与微手机网站 Leaflet.min
// [6].手机外观设计 MobileSite.min