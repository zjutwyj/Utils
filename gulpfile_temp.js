var gulp = require('gulp');

/** 项目发布相关 */
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var minifyCSS = require('gulp-minify-css');
var usemin = require('gulp-usemin');
var htmlmin = require('gulp-htmlmin');
var imagemin = require('gulp-imagemin');
var rev = require('gulp-rev');
var del = require('del');


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
  DISTDIR = 'C:/software/member',
  src = {
    all: [SRCDIR + '/**', TMPDIR + '/**'],
    base: [SRCDIR + '/base/**.js', TMPDIR + '/base/**'],
    demo: [SRCDIR + '/common/**', TMPDIR + '/demo/**'],
    html: [SRCDIR + '/index.html', TMPDIR + '/index.html'],
    scripts: [SRCDIR + '/**/*.js', TMPDIR + '/**/*.js'],
    styles: [SRCDIR + '/**/*.css', TMPDIR + '/**/*.css']
  },
  dist = {
    all: DISTDIR + '/**',
    html: DISTDIR + '/index.html',
    scripts: DISTDIR + '/**',
    styles: DISTDIR + '/**',
    images: DISTDIR + '/images',
    font: DISTDIR + '/font',
    source: DISTDIR + '/vendor'
  };

gulp.task('usemin', function () {
  gulp.src([DISTDIR + '/modules/**']).pipe(uglify()).pipe(gulp.dest(DISTDIR));
  //return gulp.src([SRCDIR + '/modules/**/*.js', SRCDIR + '/scripts/**/*.js', SRCDIR + '/models/**/*.js', SRCDIR + '/common/**/*.js']).pipe(uglify()).pipe(gulp.dest(DISTDIR));
});
gulp.task('htmlmin', function () {
  return gulp.src(dist.all).pipe(usemin({
    js: [uglify(), rev()],
    css: [minifyCSS(), 'concat', rev()],
    html: [htmlmin({empty: true})]
  })).pipe(gulp.dest(DISTDIR));
});


// 清除dist目录
/*gulp.task('dist-clean', function (callback) {
 del(dist.all, callback);
 });*/

// 移动文件
gulp.task('moveFiles', function () {
  return gulp.src(src.all).pipe(gulp.dest(DISTDIR));
});
// 项目发布
gulp.task('dist', [], function () {
  return [gulp.start('moveFiles'), gulp.start('usemin'), gulp.start('htmlmin')];
});
/*
 gulp.task('debug', ['dist-clean'], function () {
 return [gulp.start('moveFiles'), gulp.start('compressmin'), gulp.start('usemin')]
 });
 */


/** ========================================== 辅助开发 ==============================================================*/

gulp.task('livereload', function () {
  var server = livereload();
  gulp.watch('app/index.html', function (file) {
    server.changed(file.path);
  });
});

gulp.task('connect', function () {
  console.log('启动浏览器');
  gulp.src(['test'])
    .pipe(connect({
      host: 'http://jihui88.com/member/modules/member/management/login/login.html',
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
var paths = {};
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
function dateFormat(date, fmt) {
  var date = date ? new Date(date) : new Date();
  var o = {
    "M+": date.getMonth() + 1, //月份
    "d+": date.getDate(), //日
    "h+": date.getHours(), //小时
    "m+": date.getMinutes(), //分
    "s+": date.getSeconds(), //秒
    "q+": Math.floor((date.getMonth() + 3) / 3), //季度
    "S": date.getMilliseconds() //毫秒
  };
  fmt = fmt || 'yyyy-MM-dd';
  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
  try {
    for (var k in o) {
      if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    }
  } catch (e) {
    console.log('【Error】: DateUtils.dataFormat ' + e);
  }
  return fmt;
}
// 备份版本
gulp.task('copyApp', function () {
  return gulp.src(src.all).pipe(gulp.dest('C:/software/copy/userManagement/' + dateFormat(new Date(), 'yyyyMMddhhmm')));
});
// 备份base库
gulp.task('copyBase', function () {
  return gulp.src(src.base).pipe(gulp.dest('C:/software/WebstormProjects/Utils/app/backbone'));
});
// 备份demo
gulp.task('copyDemo', function () {
  return gulp.src(src.demo).pipe(gulp.dest('C:/software/WebstormProjects/Utils/app/backbone/demo'));
});
// BaseUtils
paths['BaseUtils'] = { scripts: { source: ['./app/base/BaseUtils.js'], dist: './app/lib', name: 'BaseUtils.js' } }
gulp.task('BaseUtils', function () {
  doTask('BaseUtils', true);
});
gulp.task('BaseUtils.min', function () {
  doTask('BaseUtils', false);
});

// BaseService
paths['BaseService'] = { scripts: { source: ['./app/base/BaseService.js'], dist: './app/lib', name: 'BaseService.js' } }
gulp.task('BaseService', function () {
  doTask('BaseService', true);
});
gulp.task('BaseService.min', function () {
  doTask('BaseService', false);
});

// BaseCollection
paths['BaseCollection'] = { scripts: { source: ['./app/base/BaseCollection.js'], dist: './app/lib', name: 'BaseCollection.js' } }
gulp.task('BaseCollection', function () {
  doTask('BaseCollection', true);
});
gulp.task('BaseCollection.min', function () {
  doTask('BaseCollection', false);
});

// BaseComposite
paths['BaseComposite'] = { scripts: { source: ['./app/base/BaseComposite.js'], dist: './app/lib', name: 'BaseComposite.js' } }
gulp.task('BaseComposite', function () {
  doTask('BaseComposite', true);
});
gulp.task('BaseComposite.min', function () {
  doTask('BaseComposite', false);
});

// BaseDetail
paths['BaseDetail'] = { scripts: { source: ['./app/base/BaseDetail.js'], dist: './app/lib', name: 'BaseDetail.js' } }
gulp.task('BaseDetail', function () {
  doTask('BaseDetail', true);
});
gulp.task('BaseDetail.min', function () {
  doTask('BaseDetail', false);
});

// BaseList
paths['BaseList'] = { scripts: { source: ['./app/base/BaseList.js'], dist: './app/lib', name: 'BaseList.js' } }
gulp.task('BaseList', function () {
  doTask('BaseList', true);
});
gulp.task('BaseList.min', function () {
  doTask('BaseList', false);
});

// BaseItem
paths['BaseItem'] = { scripts: { source: ['./app/base/BaseItem.js'], dist: './app/lib', name: 'BaseItem.js' } }
gulp.task('BaseItem', function () {
  doTask('BaseItem', true);
});
gulp.task('BaseItem.min', function () {
  doTask('BaseItem', false);
});

// BaseModel
paths['BaseModel'] = { scripts: { source: ['./app/base/BaseModel.js'], dist: './app/lib', name: 'BaseModel.js' } }
gulp.task('BaseModel', function () {
  doTask('BaseModel', true);
});
gulp.task('BaseModel.min', function () {
  doTask('BaseModel', false);
});

// BaseView
paths['BaseView'] = { scripts: { source: ['./app/base/BaseView.js'], dist: './app/lib', name: 'BaseView.js' } }
gulp.task('BaseView', function () {
  doTask('BaseView', true);
});
gulp.task('BaseView.min', function () {
  doTask('BaseView', false);
});

// SuperView
paths['SuperView'] = { scripts: { source: ['./app/base/SuperView.js'], dist: './app/lib', name: 'SuperView.js' } }
gulp.task('SuperView', function () {
  doTask('SuperView', true);
});
gulp.task('SuperView.min', function () {
  doTask('SuperView', false);
});

// BaseService
paths['BaseService'] = { scripts: { source: ['./app/base/BaseService.js'], dist: './app/lib', name: 'BaseService.js' } }
gulp.task('BaseService', function () {
  doTask('BaseService', true);
});
gulp.task('BaseService.min', function () {
  doTask('BaseService', false);
});

// merge base.js config.local.js modules.config.js common.config.js config.js
paths['merge'] = { scripts: { source: [
  './app/scripts/base.js', './app/config.local.js', './app/modules/**/config.js', './app/common/**/config.js', './app/config.js'
], dist: './app/scripts', name: 'app.js' } }
gulp.task('merge', function () {
  doTask('merge', true);
});
gulp.task('merge.min', function () {
  doTask('merge', false);
});

paths['doc'] = { doc: { source: [
  'app/base/*.*', 'app/scripts/helper/HandlebarsHelper.js',
  'app/scripts/utils/Utils.js',
  'C:/software/WebstormProjects/Utils/app/backbone/Application.js',
  'C:/software/WebstormProjects/Utils/app/scripts/utils/Est.source.js',
  'app/appjs/Application.js'
], dist: './doc' } }
gulp.task('doc', function () {
  doTask('doc', false);
});

paths['imagemin'] = { images: { source: ['./app/images/*.*'], dist: './app/images'} }
gulp.task('imagemin', function () {
  doTask('imagemin', false);
});

// local
gulp.task('local', function () {
  doTask('merge', true);
  doTask('BaseUtils', true);
  doTask('BaseCollection', true);
  doTask('BaseComposite', true);
  doTask('BaseDetail', true);
  doTask('BaseItem', true);
  doTask('BaseModel', true);
  doTask('BaseView', true);
  doTask('BaseList', true);
  doTask('SuperView', true);
  doTask('BaseService', true);
  doTask('doc');
  gulp.start('copyBase');
  gulp.start('copyDemo');
});
// publish
gulp.task('publish', function () {
  doTask('merge', true);
  doTask('BaseUtils', false);
  doTask('BaseCollection', false);
  doTask('BaseComposite', false);
  doTask('BaseDetail', false);
  doTask('BaseItem', false);
  doTask('BaseModel', false);
  doTask('BaseView', false);
  doTask('BaseList', false);
  doTask('SuperView', false);
  doTask('BaseService', false);
  doTask('doc');
  gulp.start('copyBase');
  gulp.start('copyDemo');
});

gulp.task('login-min', function () {
  return gulp.src(DISTDIR + '/modules/login/login.html').pipe(usemin({
    js: [uglify({ preserveComments: 'some', mangle: false, compressor: { sequences: false, hoist_funs: false } }), rev()], // 去掉uglify({ preserveComments: 'some', mangle: false, compressor: { sequences: false, hoist_funs: false } }).on('error', gutil.log),则不压缩JS
    css: [minifyCSS(), 'concat', rev()],
    html: [htmlmin({empty: false})]
  })).pipe(gulp.dest(DISTDIR + '/modules/login'));
});
gulp.task('register-min', function () {
  return gulp.src(DISTDIR + '/modules/register/register.html').pipe(usemin({
    js: [uglify({ preserveComments: 'some', mangle: false, compressor: { sequences: false, hoist_funs: false } }), rev()], // 去掉uglify({ preserveComments: 'some', mangle: false, compressor: { sequences: false, hoist_funs: false } }).on('error', gutil.log),则不压缩JS
    css: [minifyCSS(), 'concat', rev()],
    html: [htmlmin({empty: false})]
  })).pipe(gulp.dest(DISTDIR + '/modules/register'));
});
gulp.task('map-index', function () {
  return gulp.src(DISTDIR + '/common/map/index.html').pipe(usemin({
    js: [uglify({ preserveComments: 'some', mangle: false, compressor: { sequences: false, hoist_funs: false } }), rev()], // 去掉uglify({ preserveComments: 'some', mangle: false, compressor: { sequences: false, hoist_funs: false } }).on('error', gutil.log),则不压缩JS
    css: [minifyCSS(), 'concat', rev()],
    html: [htmlmin({empty: false})]
  })).pipe(gulp.dest(DISTDIR + '/common/map'));
});


/** ==================================================== 项目发布 ====================================================*/

// 清除dist目录
gulp.task('dist-clean', function (callback) {
  return del(dist.all, callback);
});

// 移动文件
gulp.task('files-move', function () {
  return gulp.src(src.all).pipe(gulp.dest(DISTDIR));
});

// JS压缩
gulp.task('js-min', function () {
  return [
    gulp.src(DISTDIR + '/modules/*/controllers/*.js').pipe(uglify()).pipe(gulp.dest(DISTDIR + '/modules')),
    gulp.src(DISTDIR + '/scripts/helper/**').pipe(uglify()).pipe(gulp.dest(DISTDIR + '/scripts/helper')),
    gulp.src(DISTDIR + '/scripts/service/**').pipe(uglify()).pipe(gulp.dest(DISTDIR + '/scripts/service')),
    gulp.src(DISTDIR + '/scripts/utils/**').pipe(uglify()).pipe(gulp.dest(DISTDIR + '/scripts/utils')),
    gulp.src(DISTDIR + '/common/*/controllers/*.js').pipe(uglify()).pipe(gulp.dest(DISTDIR + '/common')),
    gulp.src(DISTDIR + '/models/*.js').pipe(uglify()).pipe(gulp.dest(DISTDIR + '/models'))
  ];
});

// html css\js合并
gulp.task('html-min', function () {
  //gulp.start('login-min'); // 登录页面
  //gulp.start('register-min'); // 注册页面
  //gulp.start('map-index'); // 百度地图
  return gulp.src(dist.html).pipe(usemin({
    js: [uglify({ preserveComments: 'some', mangle: false, compressor: { sequences: false, hoist_funs: false } }), rev()], // 去掉uglify({ preserveComments: 'some', mangle: false, compressor: { sequences: false, hoist_funs: false } }).on('error', gutil.log),则不压缩JS
    css: [minifyCSS(), 'concat', rev()],
    html: [htmlmin({empty: false})]
  })).pipe(gulp.dest(DISTDIR));
});

// html css\js未压缩版本
gulp.task('html', function () {
  return gulp.src(dist.html).pipe(usemin({
    js: [rev()], // 去掉uglify({ preserveComments: 'some', mangle: false, compressor: { sequences: false, hoist_funs: false } }).on('error', gutil.log),则不压缩JS
    css: [minifyCSS(), 'concat', rev()],
    html: [htmlmin({empty: false})]
  })).pipe(gulp.dest(DISTDIR));
});

// =================== 以下为清除选项 ==============================================//

gulp.task('dist-base', function () {
  del(DISTDIR + '/base/**');
});

// =================== 以下为附加清除选项 ==============================================//

// 过滤无用内容， 减少上传流量
gulp.task('dist-filter', function () {
  gulp.start('dist-base');
  del(DISTDIR + '/modules/*/main.js');
  del(DISTDIR + '/common/*/main.js');
  del(DISTDIR + '/common/*/config.js');

  //del(DISTDIR + '/styles/default/base.css');
  //del(DISTDIR + '/styles/default/bui.css');
  //del(DISTDIR + '/styles/default/dpl.css');
  //del(DISTDIR + '/styles/default/index.css');
  del(DISTDIR + '/scripts/base.js');

  del(DISTDIR + '/config.js');
  del(DISTDIR + '/config.local.js');
  del(DISTDIR + '/const.js');
  del(DISTDIR + '/app.js');
});

// 过滤一些经常不变的内容， 比如图片、第三方插件等等, 保留JS, CSS, MODULE
gulp.task('dist-module', function () {
  gulp.start('dist-filter');
  del(DISTDIR + '/images/**');
  del(DISTDIR + '/vendor/**');
  del(DISTDIR + '/styles/default/img/**');
});

// 过滤所有， 除了框架SRC源码、总的css文件
gulp.task('dist-core', function () {
  gulp.start('dist-module');
  del(DISTDIR + '/models/**');
  del(DISTDIR + '/modules/**');
  del(DISTDIR + '/common/**');
  del(DISTDIR + '/swf/**');
});


/** ==================================================== 手机后台 ====================================================*/
paths['mobileManagement_base'] = {
  scripts: {
    source: [
      './app/vendor/seajs/sea.js',
      './app/vendor/seajs/seajs-text-debug.js',
      'C:/software/WebstormProjects/Utils/app/scripts/utils/Est.source.js',
      './app/appjs/Application.js'
    ],
    name: 'base.js',
    dist: './app/modules/mobile/mobileManagement/scripts'
  }
}
gulp.task('mobileManagement_base', function () {
  doTask('mobileManagement_base', true);
});
gulp.task('mobileManagement_base.min', function () {
  doTask('mobileManagement_base', false);
});
/*[1]APP*/
paths['appjs_merge'] = {
  scripts: { source: ['./app/appjs/zepto.min.js', './app/vendor/zepto/fx.js',
    './app/appjs/lib/clickable.js', './app/appjs/lib/swapper.js', './app/appjs/lib/scrollable.js',
    './app/appjs/app.js', './app/appjs/utils.js', './app/appjs/dialog.js', './app/appjs/events.js',
    './app/appjs/metrics.js', './app/appjs/scroll.js', './app/appjs/scroll-fix.js', './app/appjs/pages.js', './app/appjs/stack.js',
    './app/appjs/transitions.js', './app/appjs/navigation.js' , './app/appjs/android-touch-fix', './app/appjs/custom.js'
  ], dist: './app/vendor/appjs', name: 'app.min.js' }
}
gulp.task('appjs_merge', function () {
  doTask('appjs_merge', true);
});
gulp.task('appjs_merge.min', function () {
  doTask('appjs_merge', false);
});

/*包装define*/
paths['appjs_wrap'] = {
  scripts: { source: ['./app/appjs/define_pre.js', './app/vendor/appjs/app.min.js', './app/appjs/define_last.js'
  ], dist: './app/vendor/appjs', name: 'App.js' },
  styles: {
    source: [
      './app/appjs/stylesheet/default.css'
    ],
    name: 'base.css',
    dist: './app/vendor/appjs'
  }
}
gulp.task('appjs_wrap', function () {
  doTask('appjs_wrap', true);
});
gulp.task('appjs_wrap.min', function () {
  doTask('appjs_wrap', false);
});
gulp.task('mobileManagement', function () {
  //［seajs & Application］　［app.js源代码］[包装]
  return [gulp.start('mobileManagement_base'), gulp.start('appjs_merge'), gulp.start('appjs_wrap')];
});
gulp.task('mobileManagement.min', function () {
  return [gulp.start('mobileManagement_base.min'), gulp.start('appjs_merge.min'), gulp.start('appjs_wrap.min')];
});

// 发布
// 清除dist目录
gulp.task('mobileManagement-dist-clean', function (callback) {
  return del(DISTDIR + '/', callback);
});

// 移动文件
gulp.task('mobileManagement-files-move', function () {
  return gulp.src(src.all).pipe(gulp.dest(DISTDIR));
});

// JS压缩
gulp.task('js-min', function () {
  return [
    gulp.src(DISTDIR + '/modules/*/controllers/*.js').pipe(uglify()).pipe(gulp.dest(DISTDIR + '/modules')),
    gulp.src(DISTDIR + '/scripts/helper/**').pipe(uglify()).pipe(gulp.dest(DISTDIR + '/scripts/helper')),
    gulp.src(DISTDIR + '/scripts/service/**').pipe(uglify()).pipe(gulp.dest(DISTDIR + '/scripts/service')),
    gulp.src(DISTDIR + '/scripts/utils/**').pipe(uglify()).pipe(gulp.dest(DISTDIR + '/scripts/utils')),
    gulp.src(DISTDIR + '/common/*/controllers/*.js').pipe(uglify()).pipe(gulp.dest(DISTDIR + '/common')),
    gulp.src(DISTDIR + '/models/*.js').pipe(uglify()).pipe(gulp.dest(DISTDIR + '/models'))
  ];
});

// html css\js合并
gulp.task('html-min', function () {
  //gulp.start('login-min'); // 登录页面
  //gulp.start('register-min'); // 注册页面
  //gulp.start('map-index'); // 百度地图
  return gulp.src(dist.html).pipe(usemin({
    js: [uglify({ preserveComments: 'some', mangle: false, compressor: { sequences: false, hoist_funs: false } }), rev()], // 去掉uglify({ preserveComments: 'some', mangle: false, compressor: { sequences: false, hoist_funs: false } }).on('error', gutil.log),则不压缩JS
    css: [minifyCSS(), 'concat', rev()],
    html: [htmlmin({empty: false})]
  })).pipe(gulp.dest(DISTDIR));
});