angular.module('app').factory('genPlayersSrv', ['localStorageService', function(localStorageService){

    var all = localStorageService.get('players') || [];

    return {
        all: all,
        _getPlayerPosition: function(player){
            for(var i = 0; i < this.all.length; i++){
                if(this.all[i].name === player.name){
                    return i;
                }
            }
            return -1;
        },
        save: function() {
            localStorageService.set('players', this.all);
        },
        create: function(name, rank){
            if(!name || !rank) return (name || 'Missing name') + ' - ' + (rank || 'missing rank');
            var player = {name : name, rank : rank.toUpperCase()};
            var pos = this._getPlayerPosition(player);
            if(pos > -1) {
                this.all.splice(pos, 1);
            }
            this.all.push(player);
            this.save();
            return null;
        },
        createAll: function(names, ranks){
            if(!names || !ranks) return ['Missing names or ranks'];
            var namesArr = names.split('\n');
            var ranksArr = ranks.split('\n');
            if(namesArr.length !== ranksArr.length) {
                return ['Not the same number of names and ranks'];
            }
            var errors = [];
            for(var i = 0; i < namesArr.length; i++) {
                var errorMessage = this.create(namesArr[i], ranksArr[i]);
                if(!!errorMessage) {
                    errors.push(errorMessage);
                }
            }
            return errors;
        },
        remove: function(player){
            var pos = this._getPlayerPosition(player);
            if(pos === -1) return;
            this.all.splice(pos, 1);
            this.save();
        },
        deleteAll: function() {
            this.all = [];
            this.save();
        }
    }
}]);