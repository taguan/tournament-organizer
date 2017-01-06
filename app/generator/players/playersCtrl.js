angular.module('app').controller('genPlayersCtrl', ['$scope', 'genPlayersSrv', function($scope, genPlayersSrv){
    $scope.errors = [];
    genPlayersSrv.findAll();
    $scope.players = genPlayersSrv;
    $scope.addPlayers = function(name, rank){
        $scope.errors = genPlayersSrv.createAll(name, rank);
        if(!$scope.errors.length){
            $scope.name = '';
            $scope.rank = '';
        }
    };
    $scope.removePlayer = function(player){
        genPlayersSrv.remove(player);
    };
    $scope.deletePlayers = function() {
        genPlayersSrv.deleteAll();
    }
}]);