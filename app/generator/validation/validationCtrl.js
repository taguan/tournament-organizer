angular.module('app').controller('genValidationCtrl', ['$scope', 'genValidationSrv', function($scope, validationSrv){
    $scope.validation = validationSrv;
}]);