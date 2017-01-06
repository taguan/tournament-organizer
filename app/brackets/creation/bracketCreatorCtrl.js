angular.module('app').controller('bracketCreatorCtrl', [ '$scope', 'bracketsSrv', 'groupsSrv', function($scope, bracketsSrv, groupsSrv){
    $scope.error = false;
    $scope.selection = {
        nbrPerGroup : null,
        startPosition : null
    };
    $scope.generateBracket = function(nbrPerGroup, startPosition){
        nbrPerGroup = parseInt(nbrPerGroup);
        $scope.error = false;
        groupsSrv.getGroupsWithSelectedPlayersAsync(nbrPerGroup, startPosition).then(function(groups){
            if(groups.length == 0){
                $scope.error = true;
            } else {
                bracketsSrv.generateBracket(groups, nbrPerGroup);
            }
        });
    }
}]);