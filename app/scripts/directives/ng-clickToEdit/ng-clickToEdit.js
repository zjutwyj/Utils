/**
 * @description ng-clickToEdit
 * @class directive - 指令集
 * @author yongjin on 2014/8/17
 */
/**
 * @description 点击编辑
 * @method [编辑] - clickToEdit
 * @author wyj <zjut_wyj@163.com>
 * @example
 *      <div click-to-edit="location.state"></div>
 **/
app.directive("clickToEdit", function() {
    var editorTemplate = '<div class="click-to-edit">' +
        '<div ng-hide="view.editorEnabled">' +
        '{{value}} ' +
        '<a ng-click="enableEditor()">编辑</a>' +
        '</div>' +
        '<div ng-show="view.editorEnabled">' +
        '<input ng-model="view.editableValue">' +
        '<a ng-click="save()">保存</a>' +
        ' or ' +
        '<a ng-click="disableEditor()">取消</a>.' +
        '</div>' +
        '</div>';
    return {
        restrict: "A",
        replace: true,
        template: editorTemplate,
        scope: {
            value: "=clickToEdit"
        },
        controller: function($scope) {
            $scope.view = {
                editableValue: $scope.value,
                editorEnabled: false
            };
            $scope.enableEditor = function() {
                $scope.view.editorEnabled = true;
                $scope.view.editableValue = $scope.value;
            };
            $scope.disableEditor = function() {
                $scope.view.editorEnabled = false;
            };
            $scope.save = function() {
                $scope.value = $scope.view.editableValue;
                $scope.disableEditor();
            };
        }
    };
});