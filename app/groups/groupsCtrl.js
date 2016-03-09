angular.module('app').controller('groupsCtrl', ['$scope', 'groupsSrv', function($scope, groupsSrv){
    groupsSrv.findAll().then(function(groups){
        if(groups.length > 0){
            $scope.selection = {
                group: groupsSrv.all[0],
                groupNumber : groupsSrv.all[0].number
            };
        }
    });
    $scope.groups = groupsSrv;
    $scope.selectGroup = function(group){
        $scope.selection.group = group;
        $scope.selection.groupNumber = group.number;
    };
}]);