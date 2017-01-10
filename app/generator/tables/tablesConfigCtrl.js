angular.module('app').controller('tablesConfigCtrl', ['$scope', 'tablesConfigSrv', function($scope, tablesConfigSrv){
    $scope.error = false;
    $scope.tablesConfigs = tablesConfigSrv;
    $scope.saveConfig = function(config){
        $scope.error = !tablesConfigSrv.validateAndSave(config);
        if(!$scope.error){
            $scope.tablesConfig = '';
        }
    }
}]);