angular.module('app').controller('genTablesConfigCtrl', ['$scope', 'genTablesConfigSrv', function($scope, tablesConfigSrv){
    $scope.error = false;
    tablesConfigSrv.findConfig().then(function(config){
       $scope.tablesConfig = config;
    });
    $scope.saveConfig = function(config){
        $scope.error = !config.validateAndSave();
    }
}]);