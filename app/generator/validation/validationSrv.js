angular.module('app').factory('genValidationSrv', ['genPlayersSrv', 'groupsConfigsSrv', 'tablesConfigSrv',
    function(playersSrv, groupsConfigsSrv, tablesConfigSrv){

    return {
        validationErrors : [],
        _addTableConfigErrors: function(){
            var that = this;
            tablesConfigSrv.findInstance().then(function(config){
               if(config.count < 1){
                   that.validationErrors.push("No table configured.");
               }
            });
        },
        _addGroupPlayersErrors: function(){
            var that = this;
            groupsConfigsSrv.findAll().then(function(groupsConfigs){
                playersSrv.findAll().then(function(players){
                    var totalNbrOfPlayers = players.length;
                    if(totalNbrOfPlayers === 0){
                        that.validationErrors.push('No player configured.');
                    }
                    var playersInGroup = 0;
                    groupsConfigs.forEach(function(groupsConfig){
                        playersInGroup = playersInGroup + (groupsConfig.nbrPlayers * groupsConfig.nbrGroups);
                    });
                    if(playersInGroup !== totalNbrOfPlayers){
                        that.validationErrors.push('Mismatch between the total number of players (' + totalNbrOfPlayers + ') ' +
                            'and the number of players in groups (' + playersInGroup + ')');
                    }
                });
            });
        },
        refreshValidationErrors : function(){
            this.validationErrors.length = 0;
            this._addTableConfigErrors();
            this._addGroupPlayersErrors();
        }

    }
}]);