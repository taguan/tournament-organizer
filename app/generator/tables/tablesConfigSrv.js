angular.module('app').factory('tablesConfigSrv', ['Restangular', 'isPositiveNumber', function(Restangular, isPositiveNumber){
    Restangular.extendModel('tablesConfig', function(model){
       model.validateAndSave = function(){
           if(!isPositiveNumber(this.count)) return false;
           this.save();
           return true;
       };
        return model;
    });
    return {
        _first: Restangular.one('tablesConfig', 1),
        instance: null,
        findInstance: function(){
            var that = this;
            return this._first.get().then(function(config){
                that.instance = config;
                return config;
            });
        }

    }
}]);