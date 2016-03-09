angular.module('app').directive('trnmtGameTableEditor', function() {
    return {
        restrict: 'E',
        scope: {
            game: '='
        },
        templateUrl: 'groups/tables/gameTableEditor.html',
        controller: 'gameTableEditorCtrl'
    };
});