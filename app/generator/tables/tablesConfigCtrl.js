angular.module('app').controller('tablesConfigCtrl', ['$scope', 'tablesConfigSrv', function($scope, tablesConfigSrv){
    $scope.error = false;
    tablesConfigSrv.findInstance();
    $scope.tablesConfigs = tablesConfigSrv;
    $scope.saveConfig = function(config){
        $scope.error = !config.validateAndSave();
        if(!$scope.error){
            $scope.tablesConfig = '';
        }
    }
}]);