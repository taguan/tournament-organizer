angular.module('app').controller('gameTableEditorCtrl', ['$scope', 'groupsSrv', 'tablesSrv', function($scope, groupsSrv, tablesSrv){
    tablesSrv.findAll();
    $scope.tables = tablesSrv;
    $scope.showModal = false;
    $scope.toggleModal = function(){
        $scope.showModal = !$scope.showModal;
    };
    $scope.bookTable = function(tableNumber) {
        groupsSrv.bookTable($scope.group, $scope.game, tableNumber);
        $scope.toggleModal();
    };
    $scope.freeTable = function(){
        groupsSrv.freeTable($scope.group, $scope.game);
        $scope.toggleModal();
    };
}]);