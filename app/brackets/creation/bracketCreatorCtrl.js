angular.module('app').controller('bracketCreatorCtrl', [ '$scope', 'bracketsSrv', 'groupsSrv', function($scope, bracketsSrv, groupsSrv){
    $scope.error = false;
    $scope.position = {
        from : null,
        to : null
    };
    $scope.generateBracket = function(from, to){
        $scope.error = false;
        groupsSrv.getPlayersWithPosition(from, to).then(function(players){
            if(players.length == 0){
                $scope.error = true;
            } else {
                bracketsSrv.generateBracket(players);
            }
        });
    }
}]);