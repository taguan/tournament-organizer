angular.module('app').directive('trnmtGamesTab', function() {
    return {
        restrict: 'E',
        scope: {
            group: '='
        },
        templateUrl: 'groups/games/gamesTab.html',
        controller: 'gamesTabCtrl'
    };
});