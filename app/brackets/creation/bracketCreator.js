angular.module('app').directive('trnmtBracketCreator', function() {
    return {
        restrict: 'E',
        scope: {},
        replace: true,
        templateUrl: 'brackets/creation/bracketCreator.html',
        controller: 'bracketCreatorCtrl'
    };
});