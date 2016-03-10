angular.module('app').controller('bracketsCtrl', [ '$scope', 'bracketsSrv', function($scope, bracketsSrv){
    bracketsSrv.findAll();
    $scope.brackets = bracketsSrv;
    $scope.deleteBrackets = function(){
        bracketsSrv.deleteAll();
    }
}]);