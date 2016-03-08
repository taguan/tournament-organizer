angular.module('app').controller('gameResultEditorCtrl', ['$scope', 'groupsSrv', function($scope, groupsSrv){
    $scope.showModal = false;
    $scope.toggleModal = function(){
        $scope.showModal = !$scope.showModal;
    };
    $scope.submitResults = function(results) {
        groupsSrv.modifyGameResults($scope.group, $scope.game, parseInt(results.p1), parseInt(results.p2));
        $scope.toggleModal();
    };
    $scope.results = {
        'p1' : $scope.game.p1Result,
        'p2' : $scope.game.p2Result
    }
}]);