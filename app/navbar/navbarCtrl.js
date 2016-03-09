angular.module('app').controller('navbarCtrl', ['$scope', '$route', function($scope, $route){
    $scope.$route = $route;
}]);