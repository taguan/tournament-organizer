angular.module('app').factory('groupsSrv', ['Restangular', '$q', 'gamesSrv', function(Restangular, $q, gamesSrv){
    return {
        all: [],
        _allP: Restangular.all('groups'),
        _findPlayer: function(group, player){
            for(var i = 0; i < group.players.length; i++){
                if(group.players[i].name === player.name){
                    return group.players[i];
                }
            }
            throw "Player not in group";
        },
        _replacePlayerInGroup: function(group, playerNameBefore, playerNameAfter, playerRankAfter){
            group.games.forEach(function(game){
               if(game.p1.name === playerNameBefore){
                   game.p1.name = playerNameAfter;
                   game.p1.rank = playerRankAfter;
               } else if(game.p2.name === playerNameBefore){
                   game.p2.name = playerNameAfter;
                   game.p2.rank = playerRankAfter;
               }
            });
            group.players.forEach(function(player){
                if(player.name === playerNameBefore){
                    player.name = playerNameAfter;
                    player.rank = playerRankAfter;
                }
            })
        },
        findAll: function() {
            var deferred = $q.defer();
            var that = this;
            this._allP.getList().then(function(groupsResp){
                that.all = groupsResp;
                deferred.resolve(groupsResp);
            }, function(){
                that.all = [];
                deferred.resolve(that.all);
            });
            return deferred.promise;
        },
        create: function(groups){
            this.all = groups;
            this.all.forEach(function(group){
                gamesSrv.addGamesToGroup(group);
                group.players.forEach(function(player){
                   player.setCount = 0;
                    player.gameCount = 0;
                });
            });
            this.save();
        },
        save: function(){
            this._allP.post(this.all);
        },
        modifyGameResults: function(group, game, p1Result, p2Result){
            var p1 = this._findPlayer(group, game.p1);
            var p2 = this._findPlayer(group, game.p2);
            p1.setCount = p1.setCount + p1Result - game.p1Result;
            p2.setCount = p2.setCount + p2Result - game.p2Result;
            if(!game.played){
                if(p1Result > p2Result){
                    p1.gameCount = p1.gameCount + 1;
                } else if(p2Result > p1Result){
                    p2.gameCount = p2.gameCount + 1;
                }
            } else {
                if(game.p1Result < game.p2Result){
                    if(p1Result > p2Result){
                        p1.gameCount = p1.gameCount + 1;
                        p2.gameCount = p2.gameCount - 1;
                    } else if(p1Result === p2Result){
                        p2.gameCount = p2.gameCount - 1;
                    }
                } else if(game.p2Result < game.p1Result){
                    if(p2Result > p1Result){
                        p2.gameCount = p2.gameCount + 1;
                        p1.gameCount = p1.gameCount - 1;
                    } else if(p2Result === p1Result){
                        p1.gameCount = p1.gameCount - 1;
                    }
                }
            }
            gamesSrv.modifyResults(game, p1Result, p2Result);
            this.save();
        },
        swapPlayers: function(group1, player1, group2, player2){
            var p1Name = player1.name;
            var p1Rank = player1.rank;
            var p2Name = player2.name;
            var p2Rank = player2.rank;
            this._replacePlayerInGroup(group1, p1Name, p2Name, p2Rank);
            this._replacePlayerInGroup(group2, p2Name, p1Name, p1Rank);
            this.save();
        }
    }
}]);