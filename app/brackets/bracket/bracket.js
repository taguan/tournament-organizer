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

                // search if the player name refer to a table number (ends with (TXX))
                if(!!playerName && playerName.search(tablePattern) > -1){
                    // extract the table number
                    tableNumber = playerName.match(tablePattern)[1];
                    // extract the true player name (without table number)
                    playerName = playerName.replace(tablePattern, "");
                }
                scope.$apply(function(){
                    scope.playerInfo.tableNumber = tableNumber;
                    scope.playerInfo.name = playerName;
                    scope.formData.newPlayerName = playerName;
                    scope.formData.selectedTableNumber = tableNumber;
                    scope.toggleModal();
                    scope.lastCallback = callback;
                });
            };

            scope.$watch("playerInfo.tableNumber", function(tableNumber){
                if(scope.lastCallback == null){
                    return;
                }
                var playerName = scope.playerInfo.name;
                if(!playerName) {
                    scope.lastCallback(null);
                }
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

            scope.$watch("playerInfo.name", function(playerName){
                if(scope.lastCallback == null){
                    return;
                }
                if(playerName){
                    var newName = playerName;
                    if(scope.playerInfo.tableNumber > 0){
                        newName = "(T" + scope.playerInfo.tableNumber + ") " + newName;
                    }
                    scope.lastCallback(newName);
                } else {
                    scope.lastCallback(null); // for Bye
                }

            });

            $(element).find('.bracket').bracket({
                init : scope.bracket.data,
                save : saveFn,
                decorator: {
                    edit: editFn,
                    render: function(container, name, score, state){
                        switch(state) {
                            case "empty-bye":
                              container.append("Bye");
                              return;
                            case "empty-tbd":
                              container.append("-");
                              return;

                            case "entry-no-score":
                            case "entry-default-win":
                            case "entry-complete":
                              container.append(name);
                              return;
                          }
                    }
                }
            });
        }
    };
}]);