angular.module('app').directive('trnmtValidationSection', function() {
    return {
        restrict: 'E',
        scope: {},
        templateUrl: 'generator/validation/validationSection.html',
        controller: 'genValidationCtrl'
    };
});