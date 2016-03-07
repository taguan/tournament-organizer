angular.module('app').directive('trnmtGenSummary', function() {
    return {
        restrict: 'E',
        scope: {},
        templateUrl: 'generator/summary/summary.html',
        controller: 'genSummaryCtrl'
    };
});