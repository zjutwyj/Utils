//Step 1. 取消下面的注释开启simple插件，注意需要先进行插件安装 npm install -g fis-postpackager-simple
fis.config.set('modules.postpackager', 'simple');

//通过pack设置干预自动合并结果，将公用资源合并成一个文件，更加利于页面间的共用

//Step 2. 取消下面的注释开启pack人工干预
 fis.config.set('pack', {
     'app/scripts/app.fis.min.js': ['app/vendor/jquery/jquery.min.js',
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
         'app/scripts/factorys/factory.js'
     ]
 });

//Step 3. 取消下面的注释可以开启simple对零散资源的自动合并
 fis.config.set('settings.postpackager.simple.autoCombine', true);


//Step 4. 取消下面的注释开启图片合并功能
 //fis.config.set('roadmap.path', [{
   //  reg: '**.css',
     //useSprite: true
 //}]);
 //fis.config.set('settings.spriter.csssprites.margin', 20);