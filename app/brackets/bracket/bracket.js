angular.module('app').directive('trnmtBracket', ['bracketsSrv', function(bracketsSrv) {
    return {
        restrict: 'E',
        scope: {
            bracket: '='
        },
        link: function postLink(scope, element) {


            var saveFn = function(data){
              scope.bracket.data = data;
                bracketsSrv.save();
            };

            $(element).bracket({
               init : scope.bracket.data,
                save : saveFn
            });
        }
    };
}]);