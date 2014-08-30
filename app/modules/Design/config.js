/**
 * @description config
 * @namespace config
 * @author yongjin on 2014/7/18
 */
app.constant('ROOT_PATH', 'modules/Design/');
app.run(['$rootScope','ROOT_PATH',
    function($rootScope, ROOT_PATH){
        $rootScope.ROOT_PATH = ROOT_PATH;
    }]);