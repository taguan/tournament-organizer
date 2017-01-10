angular.module('app').controller('groupsCtrl', ['$scope', 'groupsSrv', function($scope, groupsSrv){
    if(groupsSrv.all.length > 0){
        $scope.selection = {
            group: groupsSrv.all[0],
            groupNumber : groupsSrv.all[0].number
        };
    }
    $scope.groups = groupsSrv;
    $scope.selectGroup = function(group){
        $scope.selection.group = group;
        $scope.selection.groupNumber = group.number;
    };
}]);