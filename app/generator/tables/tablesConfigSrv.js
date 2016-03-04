angular.module('app').factory('genTablesConfigSrv', ['Restangular', function(Restangular){
    Restangular.extendModel('tablesConfig', function(model){
       model.validateAndSave = function(){
           if(!this.count) return false;
           var countAsInt = parseInt(this.count);
           if(!countAsInt || countAsInt < 1) return false;
           this.save();
           return true;
       };
        return model;
    });
    return {
        _first: Restangular.one('tablesConfig', 1),
        findConfig: function(){
            return this._first.get();
        }

    }
}]);