angular.module('app').factory('genValidationSrv', ['genPlayersSrv', 'groupsConfigsSrv', 'tablesConfigSrv',
    function(playersSrv, groupsConfigsSrv, tablesConfigSrv){

        return {
            validationErrors : [],
            isValid: false,
            _addTableConfigErrors: function(errors){
                if(tablesConfigSrv.instance.count < 1){
                    errors.push("No table configured.");
                }
            },
            _addGroupPlayersErrors: function(errors){
                var totalNbrOfPlayers = playersSrv.all.length;
                if(totalNbrOfPlayers === 0){
                    errors.push('No player configured.');
                }
                var playersInGroup = 0;
                groupsConfigsSrv.all.forEach(function(groupsConfig){
                    playersInGroup = playersInGroup + (groupsConfig.nbrPlayers * groupsConfig.nbrGroups);
                });
                if(playersInGroup !== totalNbrOfPlayers){
                    errors.push('Mismatch between the total number of players (' + totalNbrOfPlayers + ') ' +
                        'and the number of players in groups (' + playersInGroup + ')');
                }
            },
            refreshValidationErrors : function(){
                var errors = [];
                this._addTableConfigErrors(errors);
                this._addGroupPlayersErrors(errors)
                this.validationErrors = errors;
                this.isValid = errors.length === 0;
            }

        }
    }]);