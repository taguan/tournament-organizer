angular.module('app').factory('genPlayers', ['Restangular', '$q', function(Restangular, $q){
    return {
        _players: [],
        _all: Restangular.all('players'),
        _getPlayerPosition: function(player){
            for(var i = 0; i < this._players.length; i++){
                if(this._players[i].name === player.name){
                    return i;
                }
            }
            return -1;
        },
        findAll: function() {
            var deferred = $q.defer();
            var that = this;
            this._all.getList().then(function(playersResp){
                that._players = playersResp;
                deferred.resolve(playersResp);
            });
            return deferred.promise;
        },
        create: function(name, rank){
            var player = {name : name, rank : rank};
            if(this._getPlayerPosition(player) > -1) return;
            this._players.push(player);
            this._all.post(this._players);
        },
        remove: function(player){
            var pos = this._getPlayerPosition(player);
            if(pos === -1) return;
            this._players.splice(pos, 1);
            this._all.post(this._players);
        }
    }
}]);