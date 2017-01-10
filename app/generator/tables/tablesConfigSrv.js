angular.module('app').factory('tablesConfigSrv',  ['isPositiveNumber', 'localStorageService',
    function(isPositiveNumber, localStorageService){

    var instance = localStorageService.get('tablesConfig');
    if(!instance) {
        instance = {count: 0};
        localStorageService.set('tablesConfig', instance);
    }

    return {
        instance: instance,
        validateAndSave: function(instance) {
            if(!isPositiveNumber(instance.count)) return false;
            this.instance = instance;
            instance.count = parseInt(instance.count);
            localStorageService.set('tablesConfig', instance);
            return true;
        }
    }
}]);