angular.module('app').factory('genSummarySrv', ['genPlayersSrv', 'groupsConfigsSrv', 'tablesConfigSrv',
    function(playersSrv, groupsConfigsSrv, tablesConfigSrv){
    return {
        players: playersSrv,
        tablesConfigs: tablesConfigSrv,
        groupsConfigs: groupsConfigsSrv
    };
}]);