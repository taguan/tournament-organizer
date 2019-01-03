angular.module('app').controller('bracketCtrl', [ '$scope', 'tablesSrv', function($scope, tablesSrv){
    $scope.tables = tablesSrv;
    $scope.showModal = false;
    $scope.toggleModal = function(){
        $scope.showModal = !$scope.showModal;
    };
    $scope.playerInfo = {
        name: null,
        tableNumber: null
    };
    $scope.formData = {
        newPlayerName: null,
        selectedTableNumber: null
    };
    $scope.freeTable = function(tableNumber){
        tablesSrv.freeTable(tableNumber);
        $scope.playerInfo.tableNumber = null;
        tablesSrv.save();
        $scope.toggleModal();
    };
    $scope.bookTable = function(tableNumber){
        if($scope.playerInfo.tableNumber > 0){
            tablesSrv.freeTable($scope.playerInfo.tableNumber);
        }
        tablesSrv.bookTable(tableNumber);
        $scope.playerInfo.tableNumber = tableNumber;
        tablesSrv.save();
        $scope.toggleModal();
    };
    $scope.modifyPlayerName = function(newPlayerName){
        $scope.playerInfo.name = newPlayerName;
        $scope.toggleModal();
    }
}]);