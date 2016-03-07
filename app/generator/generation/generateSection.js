angular.module('app').directive('trnmtGenerateSection', function() {
    return {
        restrict: 'E',
        scope: {},
        templateUrl: 'generator/generation/generateSection.html',
        controller: 'generationCtrl'
    };
});