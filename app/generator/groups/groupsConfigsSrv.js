angular.module('app').factory('groupsConfigsSrv', ['isPositiveNumber', 'localStorageService',
    function(isPositiveNumber, localStorageService){

    var all = localStorageService.get('groupsConfig') || [];

    return {
        all: all,
        _getConfigPosition: function(config){
            for(var i = 0; i < this.all.length; i++){
                if(this.all[i].nbrPlayers === config.nbrPlayers){
                    return i;
                }
            }
            return -1;
        },
        create: function(nbrPlayers, nbrGroups){
            if(!isPositiveNumber(nbrGroups)) return false;
            var nbrGroupsInt = parseInt(nbrGroups);
            if(nbrPlayers < 2 || nbrPlayers > 8) return false;
            var groupsConfig = {nbrPlayers : nbrPlayers, nbrGroups : nbrGroupsInt};
            if(this._getConfigPosition(groupsConfig) > -1) return false;
            this.all.push(groupsConfig);
            localStorageService.set('groupsConfig', this.all);
            return true;
        },
        remove: function(groupsConfig){
            var pos = this._getConfigPosition(groupsConfig);
            if(pos === -1) return;
            this.all.splice(pos, 1);
            localStorageService.set('groupsConfig', this.all);
        }
    }
}]);