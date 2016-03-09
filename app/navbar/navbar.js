angular.module('app').directive('trnmtNav', function() {
    return {
        restrict: 'E',
        scope: {},
        templateUrl: 'navbar/navbar.html',
        controller: 'navbarCtrl'
    };
});