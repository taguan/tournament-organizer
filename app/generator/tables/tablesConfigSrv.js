angular.module('app').factory('tablesConfigSrv', ['Restangular', 'isPositiveNumber', function(Restangular, isPositiveNumber){
    Restangular.extendModel('tablesConfig', function(model){
       model.validateAndSave = function(){
           if(!isPositiveNumber(this.count)) return false;
           this.count = parseInt(this.count);
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
            }, function(){
                var config = {id : 1, count : 0};
                that._first.count = 0;
                that._first.save();
                that.instance = config;
                return config;
            });
        }

    }
}]);