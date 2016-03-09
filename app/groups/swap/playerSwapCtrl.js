angular.module('app').controller('playerSwapCtrl', ['$scope', 'groupsSrv', function($scope, groupsSrv){
    $scope.groups = groupsSrv;
    $scope.p1 = {
        group: null,
        player : null
    };
    $scope.p2 = {
        group: null,
        player : null
    };
    $scope.swapPlayers = function(group1, player1, group2, player2){
        groupsSrv.swapPlayers(group1, player1, group2, player2)
    };
}]);