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
            this._allP.post(this.all);
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
        }
    }
}]);