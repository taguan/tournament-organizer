angular.module('app').directive('trnmtGamesResultEditor', function() {
    return {
        restrict: 'E',
        scope: {
            game: '=',
            group: '='
        },
        templateUrl: 'groups/games/gameResultEditor.html',
        controller: 'gameResultEditorCtrl'
    };
});