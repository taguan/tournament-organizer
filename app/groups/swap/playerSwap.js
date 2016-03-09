angular.module('app').directive('trnmtPlayerSwap', function() {
    return {
        restrict: 'E',
        scope: {},
        templateUrl: 'groups/swap/playerSwap.html',
        controller: 'playerSwapCtrl'
    };
});