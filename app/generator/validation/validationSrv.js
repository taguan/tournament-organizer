angular.module('app').factory('genValidationSrv', ['genPlayersSrv', 'groupsConfigsSrv', 'tablesConfigSrv', '$q',
    function(playersSrv, groupsConfigsSrv, tablesConfigSrv, $q){

        return {
            validationErrors : ['Validation not yet performed, come back in a moment'],
            isValid: false,
            inProgress: true,
            _addTableConfigErrors: function(errors){
                var deferred = $q.defer();
                tablesConfigSrv.findInstance().then(function(config){
                    if(config.count < 1){
                        errors.push("No table configured.");
                    }
                    deferred.resolve();
                });
                return deferred.promise;
            },
            _addGroupPlayersErrors: function(errors){
                var deferred = $q.defer();
                groupsConfigsSrv.findAll().then(function(groupsConfigs){
                    playersSrv.findAll().then(function(players){
                        var totalNbrOfPlayers = players.length;
                        if(totalNbrOfPlayers === 0){
                            errors.push('No player configured.');
                        }
                        var playersInGroup = 0;
                        groupsConfigs.forEach(function(groupsConfig){
                            playersInGroup = playersInGroup + (groupsConfig.nbrPlayers * groupsConfig.nbrGroups);
                        });
                        if(playersInGroup !== totalNbrOfPlayers){
                            errors.push('Mismatch between the total number of players (' + totalNbrOfPlayers + ') ' +
                                'and the number of players in groups (' + playersInGroup + ')');
                        }
                        deferred.resolve();
                    });
                });
                return deferred.promise;
            },
            refreshValidationErrors : function(){
                this.inProgress = true;
                var that = this;
                var errors = [];
                this._addTableConfigErrors(errors).then(function(){
                    that._addGroupPlayersErrors(errors).then(function(){
                        that.validationErrors = errors;
                        that.isValid = errors.length === 0;
                        that.inProgress = false;
                    })
                });
            }

        }
    }]);