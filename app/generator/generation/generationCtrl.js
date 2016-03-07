angular.module('app').controller('generationCtrl', ['$scope', 'generationSrv', function($scope, generationSrv){
    $scope.generateTournament = function(){
        generationSrv.generateTournament();
    }
}]);