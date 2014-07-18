/**
 * @class angular-ui
 * @constructor angular-ui
 */

/**
 * @description 普通树
 * @method treeModel
 * @module angularTreeview
 * @param {String} data-angular-treeview
 * @author wyj on 14/7/8
 * @example
 *      <div angular-treeview="true"
 *      tree-id="tree01"
 *      tree-model="roleList1"
 *      node-id="roleId"
 *      node-label="roleName"
 *      node-children="children" > </div>
 */
(function (angular) {
    'use strict';
    angular.module('ui.bootstrap.treeview', []).directive('treeModel', ['$compile', function ($compile) {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                var treeId = attrs.treeId;
                var treeModel = attrs.treeModel; // 数据源
                var nodeId = attrs.nodeId || 'id'; // ID字段
                var nodeLabel = attrs.nodeLabel || 'label';// 名称字段
                var nodeChildren = attrs.nodeChildren || 'children'; // 子列表
                // 模板
                var template =
                        '<div class="tree-folder" ng-repeat="node in ' + treeModel + '">' +
                            '<div class="tree-folder-header">' +
                                '<i class="blue icon-folder-close" ng-show="node.' + nodeChildren + '.length && node.collapsed" ng-click="' + treeId + '.selectNodeHead(node)"></i>' +
                                '<i class="blue icon-folder-open" ng-show="node.' + nodeChildren + '.length && !node.collapsed" ng-click="' + treeId + '.selectNodeHead(node)"></i>' +
                                '<i class="blue icon-file" ng-hide="node.' + nodeChildren + '.length"></i>' +
                            '<div class="tree-folder-name" ng-class="node.selected" data-ng-click="' + treeId + '.selectNodeLabel(node)">{{node.' + nodeLabel + '}}</div>' +
                            '</div>' +
                            '<div class="tree-folder-content" ng-hide="node.collapsed" tree-id="' + treeId + '" tree-model="node.' + nodeChildren + '" node-id=' + nodeId + ' node-label=' + nodeLabel + ' node-children=' + nodeChildren + '>' +
                            '</div>' +
                        '</div>';
                if (treeId && treeModel) {
                    if (attrs.angularTreeview) { // 若为根节点
                        scope[treeId] = scope[treeId] || {};
                        // 点击根节点
                        scope[treeId].selectNodeHead = scope[treeId].selectNodeHead || function (selectedNode) {
                            selectedNode.collapsed = !selectedNode.collapsed;
                        };
                        // 点击名称
                        scope[treeId].selectNodeLabel = scope[treeId].selectNodeLabel || function (selectedNode) {
                            // 移除高亮
                            if (scope[treeId].currentNode && scope[treeId].currentNode.selected) {
                                scope[treeId].currentNode.selected = undefined;
                            }
                            // 设置当前元素高亮
                            selectedNode.selected = 'selected';
                            // 设置当前元素
                            scope[treeId].currentNode = selectedNode;
                            scope.folderInto(selectedNode[nodeId]);
                        };
                    }
                    // 渲染模板.
                    element.html('').append($compile(template)(scope));
                }
            }
        };
    }]);
})(angular);
