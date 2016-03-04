angular.module('app').controller('genPlayersCtrl', ['$scope', 'genPlayers', function($scope, genPlayers){
    genPlayers.findAll().then(function(players){
        $scope.players = players;
    });
    $scope.addPlayer = function(name, rank){
        genPlayers.create(name, rank);
    };
    $scope.removePlayer = function(player){
        genPlayers.remove(player);
    }
}]);