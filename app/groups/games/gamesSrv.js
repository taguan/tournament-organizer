angular.module('app').factory('gamesSrv', ['groupsRules', function(groupsRules){
    return {
        addGamesToGroup : function(group){
            group.games = [];
            groupsRules[group.nbrOfPlayers].forEach(function(gameDef){
                group.games.push({
                    "p1" : group.players[gameDef.p1 - 1],
                    "p2" : group.players[gameDef.p2 - 1],
                    "referee" : gameDef.a != 0 ? group.players[gameDef.a - 1] : null,
                    "played" : false,
                    "p1Result" : 0,
                    "p2Result" : 0,
                    "tableNumber" : null
                })
            });
        },
        modifyResults: function(game, p1Result, p2Result){
            game.p1Result = p1Result;
            game.p2Result = p2Result;
            game.played = !(p1Result == 0 && p2Result == 0);
        }
    };
}]);