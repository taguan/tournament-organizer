'use strict';

angular.module('app', ['restangular', 'ngRoute']);

angular.module('app').config(['RestangularProvider', function(RestangularProvider){
    RestangularProvider.setBaseUrl('/data');
}]);

angular.module('app').config(['$routeProvider', function($routeProvider){
    $routeProvider.when('/generator', {
        templateUrl: '/generator/generator.html'
    }).when('/groups', {
        templateUrl: '/groups/groups.html'
    }).when('/brackets', {
        templateUrl: '/brackets/brackets.html'
    }).otherwise({
        redirectTo: '/generator'
    });
}]);
