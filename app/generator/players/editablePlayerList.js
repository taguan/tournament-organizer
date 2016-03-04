angular.module('app').directive('trnmtEditablePlayerList', function() {
    return {
        restrict: 'E',
        scope: {},
        templateUrl: 'generator/players/editablePlayerList.html',
        controller: 'genPlayersCtrl'
    };
});