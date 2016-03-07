angular.module('app').factory('genPlayersSrv', ['Restangular', '$q', function(Restangular, $q){
    return {
        all: [],
        _allP: Restangular.all('players'),
        _getPlayerPosition: function(player){
            for(var i = 0; i < this.all.length; i++){
                if(this.all[i].name === player.name){
                    return i;
                }
            }
            return -1;
        },
        findAll: function() {
            var deferred = $q.defer();
            var that = this;
            this._allP.getList().then(function(playersResp){
                that.all = playersResp;
                deferred.resolve(playersResp);
            });
            return deferred.promise;
        },
        create: function(name, rank){
            if(!name || !rank) return false;
            var player = {name : name, rank : rank.toUpperCase()};
            if(this._getPlayerPosition(player) > -1) return false;
            this.all.push(player);
            this._allP.post(this.all);
            return true;
        },
        remove: function(player){
            var pos = this._getPlayerPosition(player);
            if(pos === -1) return;
            this.all.splice(pos, 1);
            this._allP.post(this.all);
        }
    }
}]);