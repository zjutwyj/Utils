/**
 * Created by wjin on 14-2-20.
 */
'use strict';

angular.module('angularOneApp').factory('Message', ['$api', 'API_END_POINT',
  function ($resource, API_END_POINT) {
    return $resource(API_END_POINT + 'message/:id', {
      id: '@message_id'
    });
  }
]);

function messageCtrl($scope, $rootScope, $http, $modal, API_END_POINT,  $filter, ngTableParams) {
  $scope.reverse = false;
  $scope.checkAll = false;
  $scope.checkAllFn = function () {
    $scope.checkAll = !$scope.checkAll;
  }

  $scope.tableParams = new ngTableParams({
    page: 1, // show first page
    count: 10, // count per page
    sorting: {
      sort: 'desc' // initial sorting
    }
  }, {
    total: 0, // length of data
    getData: function ($defer, params) {

      $http.get(API_END_POINT + 'message', {
        withCredentials: true,
        params: {
          page: params.page(),
          per_page: params.count()
        }
      }).success(function (data) {
        $scope.messagelist = data['data'];

        var filteredData = params.filter() ?
          $filter('filter')($scope.messagelist, params.filter()) :
          $scope.messagelist;
        var orderedData = params.sorting() ?
          $filter('orderBy')(filteredData, params.orderBy()) :
          filteredData;

        params.total(data['count']); // set total for recalc pagination
        $defer.resolve(orderedData);
        //$defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
      }).error(function (data) {});
    },
    $scope: {
      $data: {}
    }

  });

  $scope.view = function (message) {
    if (message.recv_state == '00') {
      $http.put(API_END_POINT + 'message/' + message.message_id, '{"recv_state":"01"}')
        .success(function (data) {
          $rootScope.msgcount = $rootScope.msgcount - 1;
          message.recv_state='01';
          //alert(data);
        })
        .error(function (data) {
          alert(data);
        });
    }
    var modalInstance = $modal.open({
      templateUrl: '../../views/message/message_view.html',
      controller: ['$scope', '$modalInstance', 'message',
          function ($scope, $modalInstance, message) {
          $scope.message = message.message;
          $scope.msgContent = message.message.content;
              $rootScope.modalInit($scope, $modalInstance, $scope.message);
      }],
      resolve: {
        message: function () {
          return {
            message: message
          };
        }
      }
    });
  };
  $scope.del = function (message, $index) {
    if (confirm("确定删除？"))
      $http({
          method : 'DELETE',
          url:API_END_POINT + 'message/' + message.message_id
      }).success(function (data) {
        $rootScope.showMsg('删除成功!', {
            time : 500
        });
        if (message.recv_state == '00') {
          $rootScope.msgcount = $rootScope.msgcount - 1;
        }
        $scope.messagelist.splice($index, 1);
      }).error(function (data) {

      })
  }
    $scope.customize = function (){
        var modalInstance = $modal.open({
            templateUrl: '../../views/message/customize.html',
            controller: ['$http','API_END_POINT','$scope', '$modalInstance',
                function ($http,API_END_POINT,$scope, $modalInstance) {
                $http.get(API_END_POINT + 'profile/customize')
                    .success(function (data) {
                        $scope.customize = data;
                    })
                    .error(function (data) {
                        $scope.customize.type='custommessage';
                    });
                $scope.ok = function () {
                    $scope.customize.type='custommessage';
                    $http.put(API_END_POINT + 'profile/customize',$scope.customize)
                        .success(function (data) {
                            $scope.customize = data;
                        })
                        .error(function (data) {
                            //alert('读取错误');
                        });
                    $modalInstance.close();

                };
                $scope.cancel = function () {

                    $modalInstance.dismiss('cancel');

                };
            }],
            resolve: {
                message: function () {
                    return {

                    };
                }
            }
        });
    }

}

function indexMsgCtrl($scope, $rootScope, $modal, $http, API_END_POINT) {
            $http.get(API_END_POINT + 'message?state=00&&per_page=100')
                .success(function (data) {
                    $rootScope.msgcount = data.count;
                    $scope.msglist = data;
                })
                .error(function (data) {
                    //alert('读取错误');
                });

  $rootScope.view = function (message) {
    if (message.recv_state === '00') {
      $http.put(API_END_POINT + 'message/' + message.message_id, '{"recv_state":"01"}')
        .success(function (data) {
          $rootScope.msgcount = $rootScope.msgcount - 1;
          //alert(data);
        })
        .error(function (data) {
          alert(data);
        });
    }
    var modalInstance = $modal.open({
      templateUrl: '../../views/message/message_view.html',
      controller: ['$scope', '$modalInstance', 'message',
          function ($scope, $modalInstance, message) {
          $scope.message = message.message;
          $scope.msgContent = message.message.content;
              $rootScope.modalInit($scope, $modalInstance, $scope.message);
      }],
      resolve: {
        message: function () { return { message: message };
        }
      }
    });
  };

}
