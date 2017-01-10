angular.module('app').controller('groupsConfigsCtrl', ['$scope', 'groupsConfigsSrv', function($scope, groupsConfigsSrv){
    $scope.error = false;
    $scope.groupsConfigs = groupsConfigsSrv;
    $scope.addGroupsConfig = function(nbrPlayers, nbrGroups){
        $scope.error = !groupsConfigsSrv.create(nbrPlayers, nbrGroups);
        if(!$scope.error){
            $scope.nbrPlayers = '';
            $scope.nbrGroups = '';
        }
    };
    $scope.removeGroupsConfig = function(config){
        groupsConfigsSrv.remove(config);
    }
}]);