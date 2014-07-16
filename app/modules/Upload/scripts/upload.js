/**
 图片上传

 @author wyj <zjut_wyj@163.com>
 @modified  wyj <2014-03-11>
 @date 2014-02-25
 **/
app.config([ '$httpProvider', 'fileUploadProvider','API_END_POINT',
    function ($httpProvider, fileUploadProvider, API_END_POINT) {
        angular.extend(fileUploadProvider.defaults, {
            disableImageResize: /Android(?!.*Chrome)|Opera/
                .test(window.navigator.userAgent),
            maxFileSize: 5000000,
            acceptFileTypes: /(\.|\/)(gif|jpe?g|png|swf|flv)$/i,
            xhrFields: {withCredentials: true},
            url: API_END_POINT + "upload"
        });
        if (typeof(window.UEDITOR_CONFIG) != 'undefined'){
            window.UEDITOR_CONFIG.imageUrl = API_END_POINT + 'upload';
            window.UEDITOR_CONFIG.imageManagerUrl = API_END_POINT + 'album/Album_00000000000000000000000830/att';
        }
    }
]);
var pic_resize = function(src, size){
    var src = src ? src : 'upload/system/nopic.jpg',
        dx = src.lastIndexOf("."),
        format = src.substring(dx,src.length);
    return src.substring(0,dx) + "_" + size + format;
}
/**
 * @description 图片上传
 * @method FileUploadCtrl
 * @param $scope
 * @param $rootScope
 * @param $http
 * @param API_END_POINT
 * @constructor
 * @author wyj on 14/5/24
 * @eample
 *
 */

app.controller('FileUploadCtrl', ['$scope', '$rootScope', '$http', 'API_END_POINT', 'AlbumFactory','PictureFactory','$modal',
    function($scope, $rootScope, $http, API_END_POINT, AlbumFactory, PictureFactory, $modal){
        var formDataOpt = [{ name: 'album_id', value: $scope.albumId}];
        $scope.thumb_size  = { width: 80, height: 80 }
        $scope.API_END_POINT = API_END_POINT;
        $scope.cateName = "";
        $scope.searchText = '';
        $scope.loadingFiles = true;
        $scope.albumId = $scope.albumId || null;
        $scope.page = 1;
        $scope.pageSize = 18;
        $scope.pageList = [];
        $scope.pageNum = [];
        $scope.maxPage = 0;
        $scope.cur_cate_list = [];
        $scope.history = [null];
        $scope.breakNav = [];
        $scope.temp = null;
        $scope.checkboxList = [];
        $scope.checkAllFn = function () {
            $scope.checkAll = !$scope.checkAll;
        }
        // 上传配置
        $scope.upload_opts = {
            autoUpload: true,
            formData :formDataOpt,
            done: function (e, data) {
                setTimeout(function(){
                    data.result[0].thumbnail_path = data.result[0].server_path;
                    $scope.pageList.unshift(data.result[0]);
                    $scope.folderReFresh();
                }, 1000);
            }
        }
        $scope.preUpload = function(){
            if (!$scope.albumId){
                $scope.folderInto($scope.album_list[0]['album_id']);
            }
        }
        // 获取图片
        $scope.get_pic = function(id){
            $scope.albumId = id;
            formDataOpt[0]['value'] = id;
            PictureFactory.query(id).then(function(list){
                $scope.pic_list = list;
                $scope.pagination(list, $scope.page, $scope.pageSize);
            });
        }
        // 选择图片
        $scope.select_pic = function(pic){
            $scope.select_list.push(pic);
            $scope.ok();
        }
        // 图片删除
        $scope.pic_delete = function(pic,index,$event){
            $rootScope.open("是否删除该图片？",function(){
                PictureFactory.del($scope.albumId, pic.att_id).then(function(){
                    $scope.pageList.splice(index, 1);
                });
            },{ ok: "确定", cancel: "取消" });
            $event.stopPropagation();
        }
        // 图片批量删除
        $scope.pic_delete_all = function(){
            if ($scope.checkboxList.length === 0) return;
            $rootScope.open("是否删除选中的图片？", function(){
                PictureFactory.del($scope.checkboxList).then(function(){
                    $scope.folderReFresh();
                    $scope.checkboxList.length = 0;
                });
            }, { ok: "确定", cancel: "取消" });
        }
        // 获取相册分类 程序入口
        AlbumFactory.query().then(function(result){
            $scope.album_list = result.data;
            $scope.cate_list = $scope.cur_cate_list = Est.bulidTreeNode(result.data, 'parent_id', null, {
                  categoryId: 'album_id',
                  belongId: 'parent_id',
                  childTag: 'children'
            });
            if ($scope.cate_list.length === 0){
                var deferred = $q.defer();
                add_cate('默认相册', $scope.albumId);
                add_cate('产品图片相册', $scope.albumId);
                add_cate('网站装修相册', $scope.albumId);
                return deferred.promise;
            }
            // 如果存在分类ID， 则进入相应文件夹中
            if ($scope.albumId){
                $scope.folderInto($scope.albumId);
            }
        });
        // 清空文件夹内容
        $scope.cleanFolder = function(){
            $scope.pageList = [];
            $scope.cur_cate_list = [];
        }
        // 进入文件夹
        $scope.folderInto = function(album_id){
            $scope.cleanFolder();
            $scope.albumId = album_id;
            $scope.history.push(album_id);
            $scope.cur_cate_list = Est.filter($scope.album_list, {parent_id: album_id});
            $scope.get_pic(album_id);
            $scope.breakNav = Est.bulidBreakNav($scope.album_list, 'album_id', album_id, 'name', 'parent_id');
        }
        // 文件夹返回
        $scope.folderBack = function(){
            if ($scope.history.length === 1) return;
            $scope.cleanFolder();
            $scope.history.pop();
            $scope.albumId = $scope.history[$scope.history.length - 1];
            $scope.breakNav = Est.bulidBreakNav($scope.album_list, 'album_id', $scope.albumId, 'name', 'parent_id');
            $scope.cur_cate_list = Est.filter($scope.album_list, {parent_id: $scope.albumId});
            $scope.get_pic($scope.albumId);
        }
        // 刷新文件夹
        $scope.folderReFresh = function(){
            $scope.cleanFolder();
            $scope.refleshAlbum();
            $scope.get_pic($scope.albumId);
        }
        // 刷新相册分类
        $scope.refleshAlbum = function(){
            AlbumFactory.query().then(function(result){
                $scope.album_list = result.data;
                $scope.cate_list = Est.bulidTreeNode(result.data, 'parent_id', null, {
                    categoryId: 'album_id',
                    belongId: 'parent_id',
                    childTag: 'children'
                });
                $scope.cur_cate_list = Est.filter($scope.album_list, {
                    parent_id: $scope.albumId
                });
            });
        }
        // 添加相册分类
        var add_cate = function(name, albumId){
            AlbumFactory.save({name:name, parent_id: albumId}).then(function(result){
                $scope.cate_list.push(result);
            });
        }
        $scope.add_cate = function(){
            if(!$scope.cateName || $scope.cateName.length == 0) return;
            add_cate($scope.cateName, $scope.albumId);
        }
        // 分类修改
        $scope.cate_edit = function(cate){
            if ($scope.temp) $scope.temp.edit_show = false;
            $scope.temp = cate;
            return cate.edit_show = true;
        }
        $scope.cate_edit_save = function(cate){
            if (cate && cate.name !== $scope.temp.name){
                AlbumFactory.save(cate).then(function(){
                    $rootScope.showMsg('修改成功！');
                });
            }
            return cate.edit_show = false;
        }
        // 图片属性修改
        $scope.pic_edit = function(cate){
            if ($scope.temp) $scope.temp.edit_show = false;
            $scope.temp = cate;
            return cate.edit_show = true;
        }
        $scope.pic_edit_save = function(cate){
            if (cate && cate.filename !== $scope.temp.filename){
                PictureFactory.save($scope.albumId, cate).then(function(){
                    $rootScope.showMsg('修改成功！');
                });
            }
            return cate.edit_show = false;
        }
        // 图片替换
        $scope.pictureReplace = function(pic){
            pic.album_id = $scope.albumId;
            var modalInstance = $modal.open({
                templateUrl: 'modules/Upload/views/picture_replace.html',
                resolve: { pic: function () { return pic; } },
                controller: ['$scope', '$modalInstance', 'pic', function($scope, $modalInstance, pic){
                    var formDataOpt = [{name:'album_id', value:pic.album_id},{name: 'att_id', value:pic.att_id} ];
                    $scope.upload_opts = {
                        autoUpload: true,
                        formData :formDataOpt,
                        done: function (e, data) {
                            data.result[0].thumbnail_path = data.result[0].server_path + '?id=' + Est.nextUid();
                            pic = data.result[0];
                            $scope.ok();
                        }
                    }
                    $scope.pic = pic;
                    $rootScope.modalInit($scope, $modalInstance, $scope.pic);
                }]
            });
            modalInstance.result.then(function(pic){
                $rootScope.showMsg('替换成功');
                setTimeout(function(){
                    $scope.pic_list.push(pic);
                    $scope.folderReFresh();
                }, 1000);
            });
        }
        // 分类删除
        $scope.cate_delete = function(cate, index) {
            $rootScope.open("删除该分类会将这个分类下所有的文件全部删除，是否继续？",function(){
                AlbumFactory.del(cate).then(function(){
                    $scope.folderReFresh();
                });
            },{ ok: "确定", cancel: "取消" });
        };
        // 分页
        $scope.pagination = function(list, page, pageSize){
            $scope.page = page;
            $scope.pageList = Est.getListByPage (list, page, pageSize);
            $scope.maxPage = Est.getMaxPage(list.length, pageSize);
            $scope.pageNum = Est.getPaginationNumber(parseInt(page), parseInt($scope.maxPage), 9);
        }
        $scope.pageTo = function(page){
            $scope.pagination($scope.pic_list, page, $scope.pageSize);
        }
        $scope.pagePre = function(){
            $scope.pageTo($scope.page === 1 ? 1 : --$scope.page);
        }
        $scope.pageNext = function(){
            $scope.pageTo($scope.page === $scope.maxPage ? $scope.maxPage : ++$scope.page);
        }
        // 复制图片链接
        $scope.copyImgSrc = function(pic){
            var modalInstance = $modal.open({
                templateUrl: 'modules/Upload/views/copy_src.html',
                controller: ['$scope', '$modalInstance', function($scope, $modalInstance){
                    $scope.pic = pic;
                    $rootScope.modalInit($scope, $modalInstance, $scope.pic);
                }],
                windowClass : 'pic-upload-dialog',
                resolve: { pic: function () { return pic; } }
            });
            modalInstance.result.then(function () {
                $rootScope.showMsg('复制成功');
            });
        }
        // 分类显示隐藏
        $scope.cate_hover = function(cate) {
            return cate.show_tool = ! cate.show_tool;
        };
        $scope.pic_hover = function(pic){
            return pic.show_tool = ! pic.show_tool;
        }
        $scope.checkbox_checked = function(pic,$event){
            $event.stopPropagation();
            if (pic.checked){
                $scope.checkboxList.splice(Est.indexOf($scope.checkboxList, pic.att_id), 1);
            } else{
                $scope.checkboxList.push(pic.att_id);
            }
            return pic.checked = ! pic.checked;
        }
        $scope.openGalleryUploadDialog = function(){
            var modalInstance = $modal.open({
                templateUrl: 'modules/Upload/views/file_upload.html',
                controller: ['$scope', '$modalInstance', 'album_id', function ($scope, $modalInstance, album_id) {
                    $scope.select_list = [];
                    $scope.albumId = album_id || null;
                    $rootScope.modalInit($scope, $modalInstance, $scope.select_list);
                }],
                windowClass : 'pic-upload-dialog',
                resolve: { album_id: function () { return $scope.albumId; } }
            });
            modalInstance.result.then(function () {
                $scope.folderReFresh();
            });
        }
        $scope.addAlbumDialog = function(){
            var modalInstance = $modal.open({
                templateUrl: 'modules/Upload/views/album_add.html',
                controller: ['$scope', '$modalInstance', 'album', function($scope, $modalInstance, album){
                    $scope.album = album || {};
                    $rootScope.modalInit($scope, $modalInstance, $scope.album);
                }],
                windowClass: 'pic-upload-dialog',
                resolve:{album: function(){return {name:'', parent_id: $scope.albumId}}}
            });
            modalInstance.result.then(function(result){
                AlbumFactory.save(result).then(function(result){
                    $scope.refleshAlbum();
                });
            });
        }
        $scope.search = function(){
            if ($scope.searchText.length === 0){
                $scope.folderReFresh();
                return;
            }
            $scope.pageList = Est.filter($scope.pic_list, function(item){
                return item.filename.indexOf($scope.searchText) > -1;
            });
            $scope.pageNum = [1];
        }
}]);
app.controller('uploadPicCtrl', ['$scope', '$rootScope', 'API_END_POINT',
    function($scope, $rootScope, API_END_POINT){
        //图片上传
        $scope.openFileDialog = function(n, src){
            $rootScope.openFileDialog(function(select_list){
                $("."+n).val(select_list[0].server_path);
                if(src!=undefined){
                    $("." +src).attr("src",API_END_POINT+select_list[0].server_path);
                }
            })
        };
}]);
/**
 * @description Flash上传
 * @method FlashUploadCtrl
 * @param $scope
 * @param $rootScope
 * @param $http
 * @param API_END_POINT
 * @constructor
 * @author wyj on 14/5/24
 * @eample
 *
 */
app.controller('FlashUploadCtrl', ['$scope', '$rootScope', '$http', 'API_END_POINT', 'AlbumFactory','PictureFactory',
    function($scope, $rootScope, $http, API_END_POINT, AlbumFactory, PictureFactory){
        var formDataOpt = [{ name: 'album_id', value: $scope.albumId } ];
        $scope.API_END_POINT = API_END_POINT;
        $scope.cateName = "";
        $scope.searchText = '';
        $scope.loadingFiles = true;
        $scope.albumId = "";
        $scope.thumb_size  = { width: 80, height: 80 }
        $scope.upload_opts = {
            autoUpload: true,
            formData :formDataOpt,
            done: function (e, data) {
                data.result[0].thumbnail_path = data.result[0].server_path;
                $scope.pic_list.unshift(data.result[0]);
            }
        }
        // 获取flash
        $scope.get_pic = function(id){
            $scope.albumId = id;
            formDataOpt[0]['value'] = id;
            PictureFactory.query(id, {flash: 1}).then(function(list){
                $scope.pic_list = list;
            });
        }
        // 选择flash
        $scope.select_pic = function(pic){
            $scope.select_list.push(pic);
            $scope.ok();
        }
        // flash删除
        $scope.pic_delete = function(pic, index, $event){
            $rootScope.open("是否删除该flash？", function(){
                AlbumFactory.del($scope.albumId, pic.att_id).then(function(){
                    $scope.pic_list.splice(index, 1);
                });
            },{ ok: "确定", cancel: "取消" });
            $event.stopPropagation();
        }
        // 获取flash分类
        AlbumFactory.query().then(function(result){
            $scope.cate_list = result.data;
            $scope.get_pic($scope.cate_list[0].album_id);
        });
        $scope.checkbox_checked = function(pic,$event){
            $event.stopPropagation();
            return pic.checked = ! pic.checked;
        }
}]);

app.run(['$rootScope', '$modal', function ($rootScope, $modal) {
    // 提供外部调用接口
    $rootScope.openFileDialog = function(callback){
        var modalInstance = $modal.open({
            templateUrl: 'modules/Upload/views/file_upload.html',
            controller: ['$scope', '$modalInstance', 'album_id',function ($scope, $modalInstance, album_id) {
                $scope.select_list = [];
                $scope.albumId = album_id || null;
                $rootScope.modalInit($scope, $modalInstance, $scope.select_list);
            }],
            windowClass : 'pic-upload-dialog',
            resolve: { album_id: function () { return null; } }
        });
        modalInstance.result.then(function (select_list) {
            if (typeof callback !== 'undefined') callback.call(null, select_list);
        });
        return false;
    };
    $rootScope.openFlashDialog = function(callback){
        var modalInstance = $modal.open({
            templateUrl: 'modules/Upload/views/flash_upload.html',
            controller: ['$scope', '$modalInstance', function ($scope, $modalInstance) {
                $scope.select_list = [];
                $rootScope.modalInit($scope, $modalInstance, $scope.select_list);
            }],
            windowClass : 'pic-upload-dialog',
            resolve: { album_id: function () { return null; } }
        });
        modalInstance.result.then(function (select_list) {
            if (typeof callback !== 'undefined') callback.call(null, select_list);
        });
        return false;
    }
}]);