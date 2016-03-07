angular.module('app').controller('genPlayersCtrl', ['$scope', 'genPlayersSrv', function($scope, genPlayersSrv){
    $scope.error = false;
    genPlayersSrv.findAll();
    $scope.players = genPlayersSrv;
    $scope.addPlayer = function(name, rank){
        $scope.error = !genPlayersSrv.create(name, rank);
        if(!$scope.error){
            $scope.name = '';
            $scope.rank = '';
        }
    };
    $scope.removePlayer = function(player){
        genPlayersSrv.remove(player);
    }
}]);