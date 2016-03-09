angular.module('app').factory('generationSrv', ['groupsSrv', 'genPlayersSrv', 'groupsConfigsSrv', 'tablesConfigSrv', 'tablesSrv',
    function(groupsSrv, playersSrv, groupsConfigSrv, tablesConfigSrv, tablesSrv){
        return {
            _groups : [],
            _groupIndex : 0,
            _initializeGroups: function(){
                this._groups = [];
                var counter = 1;
                for(var i = 0; i < groupsConfigSrv.all.length; i++){
                    var groupsConfig = groupsConfigSrv.all[i];
                    for(var j = 0; j < groupsConfig.nbrGroups; j++){
                        this._groups.push({number : counter, nbrOfPlayers : groupsConfig.nbrPlayers, players: []});
                        counter = counter + 1;
                    }
                }
            },
            _setNextGroupIndex: function(){
                if(this._groups.length === 1){
                    return 0;
                }
                this._groupIndex = this._groupIndex + 1;
                if(this._groupIndex === this._groups.length){
                    this._groups.reverse();
                    this._groupIndex = 1;
                }
                var group = this._groups[this._groupIndex];
                if(group.nbrOfPlayers == group.players.length){
                    return this._setNextGroupIndex();
                }
                return this._groupIndex;
            },
            generateGroups: function(){
                this._initializeGroups();
                this._groupIndex = 0;
                var players = playersSrv.all.sort(function(a, b){
                    if (a.rank < b.rank) return -1;
                    if (a.rank > b.rank) return 1;
                    return 0;
                });
                for(var i = 0; i < players.length; i++){
                    this._groups[this._groupIndex].players.push(players[i]);
                    if(i != players.length - 1){
                        this._setNextGroupIndex();
                    }
                }
                groupsSrv.create(this._groups);
            },
            generateTables: function(){
                tablesSrv.generateTables(tablesConfigSrv.instance.count);
            }
        };
    }
]);