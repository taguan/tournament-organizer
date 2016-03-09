angular.module('app').directive('trnmtBracket', function() {
    return {
        restrict: 'E',
        scope: {},
        link: function postLink(scope, element, attrs) {
            //scope.$watch(attrs.visible, function(value){
            //    if(value == true)
            //        $(element).modal('show');
            //    else
            //        $(element).modal('hide');
            //});

            //$(element).on('shown.bs.modal', function(){
            //    scope.$apply(function(){
            //        scope.$parent[attrs.visible] = true;
            //    });
            //});

            var minimalData = {
                teams : [
                    ["Team 1", "Team 2"], /* first matchup */
                    ["Team 3", "Team 4"]  /* second matchup */
                ],
                results : [
                    //[[1,2], [3,4]],       /* first round */
                    //[[4,6], [2,1]]        /* second round */
                ]
            };

            var saveFn = function(data, userData){
              console.log(data);
                console.log(userData);
            };

            $(element).bracket({
               init : minimalData,
                save : saveFn,
                userData : 'bracketId'
            });
        }
    };
});