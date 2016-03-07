angular.module('app').controller('generatorCtrl', ['$scope', 'genValidationSrv', function($scope, validationSrv){
    $scope.triggerValidation = function(){
        validationSrv.refreshValidationErrors();
    };
}]);