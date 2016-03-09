angular.module('app').config(['$routeProvider', function($routeProvider){
    $routeProvider.when('/generator', {
        templateUrl: '/generator/generator.html',
        controller: 'generatorCtrl',
        activeTab: 'generator'
    }).when('/groups', {
        templateUrl: '/groups/groups.html',
        controller: 'groupsCtrl',
        activeTab: 'groups'
    }).when('/brackets', {
        templateUrl: '/brackets/brackets.html',
        activeTab: 'brackets'
    }).otherwise({
        redirectTo: '/generator',
        controller: 'generatorCtrl',
        activeTab: 'generator'
    });
}]);