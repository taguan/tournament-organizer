angular.module('app').factory('groupsConfigsSrv', ['Restangular', '$q', 'isPositiveNumber', function(Restangular, $q, isPositiveNumber){
    return {
        all: [],
        _allP: Restangular.all('groupsConfigs'),
        _getConfigPosition: function(config){
            for(var i = 0; i < this.all.length; i++){
                if(this.all[i].nbrPlayers === config.nbrPlayers){
                    return i;
                }
            }
            return -1;
        },
        findAll: function() {
            var deferred = $q.defer();
            var that = this;
            this._allP.getList().then(function(configs){
                that.all = configs;
                deferred.resolve(configs);
            });
            return deferred.promise;
        },
        create: function(nbrPlayers, nbrGroups){
            if(!isPositiveNumber(nbrPlayers) || !isPositiveNumber(nbrGroups)) return false;
            var groupsConfig = {nbrPlayers : nbrPlayers, nbrGroups : nbrGroups};
            if(this._getConfigPosition(groupsConfig) > -1) return false;
            this.all.push(groupsConfig);
            this._allP.post(this.all);
            return true;
        },
        remove: function(groupsConfig){
            var pos = this._getConfigPosition(groupsConfig);
            if(pos === -1) return;
            this.all.splice(pos, 1);
            this._allP.post(this.all);
        }
    }
}]);