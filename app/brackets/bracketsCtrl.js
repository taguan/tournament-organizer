angular.module('app').controller('bracketsCtrl', [ '$scope', 'bracketsSrv', function($scope, bracketsSrv){
    $scope.brackets = bracketsSrv;
    $scope.deleteBrackets = function(){
        bracketsSrv.deleteAll();
    }
}]);