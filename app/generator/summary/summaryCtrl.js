angular.module('app').controller('genSummaryCtrl', ['$scope', 'genSummarySrv', function($scope, summarySrv){
    $scope.summary = summarySrv;
}]);