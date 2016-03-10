angular.module('app').controller('groupTabCtrl', ['$scope', 'groupsSrv', function($scope, groupsSrv){
    $scope.savePositions = function(){
        groupsSrv.save();
    }
}]);