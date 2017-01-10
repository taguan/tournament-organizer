angular.module('app').controller('gameTableEditorCtrl', ['$scope', 'groupsSrv', 'tablesSrv', function($scope, groupsSrv, tablesSrv){
    $scope.tables = tablesSrv;
    $scope.showModal = false;
    $scope.toggleModal = function(){
        $scope.showModal = !$scope.showModal;
    };
    $scope.bookTable = function(tableNumber) {
        groupsSrv.bookTable($scope.game, tableNumber);
        $scope.toggleModal();
    };
    $scope.freeTable = function(){
        groupsSrv.freeTable($scope.game);
        $scope.toggleModal();
    };
}]);