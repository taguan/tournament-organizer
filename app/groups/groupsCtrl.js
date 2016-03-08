angular.module('app').controller('groupsCtrl', ['$scope', 'groupsSrv', function($scope, groupsSrv){
    groupsSrv.findAll();
    $scope.groups = groupsSrv;
    $scope.selection = {
        group: null,
        groupNumber : null
    };
    $scope.selectGroup = function(group){
        $scope.selection.group = group;
        $scope.selection.groupNumber = group.number;
    }
}]);