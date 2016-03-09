angular.module('app').controller('generationCtrl', ['$scope', 'generationSrv', '$location', function($scope, generationSrv, $location){
    $scope.generateGroups = function(){
        generationSrv.generateGroups();
        generationSrv.generateTables();
        $location.path('/groups');
    }
}]);