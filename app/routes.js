angular.module('app').config(['$routeProvider', function($routeProvider){
    $routeProvider.when('/generator', {
        templateUrl: '/generator/generator.html',
        controller: 'generatorCtrl'
    }).when('/groups', {
        templateUrl: '/groups/groups.html'
    }).when('/brackets', {
        templateUrl: '/brackets/brackets.html'
    }).otherwise({
        redirectTo: '/generator'
    });
}]);