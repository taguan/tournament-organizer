angular.module('app').directive('trnmtBracket', ['bracketsSrv', function(bracketsSrv) {
    return {
        restrict: 'E',
        scope: {
            bracket: '='
        },
        templateUrl: 'brackets/bracket/bracket.html',
        controller: 'bracketCtrl',
        link: function postLink(scope, element) {

            var tablePattern = /\(T(\d+)\)\s/;

            var saveFn = function(data){
                scope.bracket.data = data;
                bracketsSrv.save();
            };

            var editFn = function(container, playerName, callback){
                var tableNumber = null;
                if(playerName.search(tablePattern) > -1){
                    tableNumber = playerName.match(tablePattern)[1];
                    playerName = playerName.replace(tablePattern, "");
                }
                scope.$apply(function(){
                    scope.playerInfo.tableNumber = tableNumber;
                    scope.playerInfo.name = playerName;
                    scope.toggleModal();
                    scope.lastCallback = callback;
                });
            };

            scope.$watch("playerInfo.tableNumber", function(tableNumber){
                if(scope.lastCallback == null){
                    return;
                }
                var playerName = scope.playerInfo.name;
                if(tableNumber > 0){
                    var tableStr = "(T" + tableNumber + ") ";
                    if(playerName.search(tablePattern) > -1){
                        playerName = playerName.replace(tablePattern, tableStr);
                    } else {
                        playerName = tableStr + playerName;
                    }
                    scope.lastCallback(playerName);
                } else {
                    playerName = playerName.replace(tablePattern, "");
                    scope.lastCallback(playerName);
                }

            });

            $(element).find('.bracket').bracket({
                init : scope.bracket.data,
                save : saveFn,
                decorator: {
                    edit: editFn,
                    render: function(container, name, score){container.append(name)}
                }
            });
        }
    };
}]);