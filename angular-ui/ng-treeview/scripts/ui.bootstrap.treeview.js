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
 *      <div data-angular-treeview="true" data-tree-id="tree01" data-tree-model="roleList1" data-node-id="roleId" data-node-label="roleName" data-node-children="children" > </div>
 */


(function (angular) {
    'use strict';
    angular.module('ui.bootstrap.treeview', []).directive('treeModel', ['$compile', function ($compile) {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                //tree id
                var treeId = attrs.treeId;
                //tree model
                var treeModel = attrs.treeModel;
                //node id
                var nodeId = attrs.nodeId || 'id';
                //node label
                var nodeLabel = attrs.nodeLabel || 'label';
                //children
                var nodeChildren = attrs.nodeChildren || 'children';
                //tree template
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


                //check tree id, tree model
                if (treeId && treeModel) {
                    //root node
                    if (attrs.angularTreeview) {
                        //create tree object if not exists
                        scope[treeId] = scope[treeId] || {};
                        //if node head clicks,
                        scope[treeId].selectNodeHead = scope[treeId].selectNodeHead || function (selectedNode) {
                            //Collapse or Expand
                            selectedNode.collapsed = !selectedNode.collapsed;
                        };
                        //if node label clicks,
                        scope[treeId].selectNodeLabel = scope[treeId].selectNodeLabel || function (selectedNode) {
                            //remove highlight from previous node
                            if (scope[treeId].currentNode && scope[treeId].currentNode.selected) {
                                scope[treeId].currentNode.selected = undefined;
                            }
                            //set highlight to selected node
                            selectedNode.selected = 'selected';
                            //set currentNode
                            scope[treeId].currentNode = selectedNode;
                            scope.folderInto(selectedNode[nodeId]);
                        };
                    }
                    //Rendering template.
                    element.html('').append($compile(template)(scope));
                }
            }
        };
    }]);
})(angular);
