angular.module('app').factory('tablesSrv', ['Restangular', '$q', function(Restangular, $q){
    return {
        all: [],
        _allP: Restangular.all('tables'),
        findAll: function() {
            var deferred = $q.defer();
            if(this.all.length > 0){
                deferred.resolve(this.all);
                return deferred.promise;
            }
            var that = this;
            this._allP.getList().then(function(tables){
                if(that.all.length > 0){
                    deferred.resolve(that.all);
                } else {
                    that.all = tables;
                    deferred.resolve(tables);
                }
            }, function(){
                that.all = [];
                deferred.resolve(that.all);
            });
            return deferred.promise;
        },
        generateTables: function(nbrOfTables){
            this.all = [];
            for(var i = 0; i < nbrOfTables; i++){
                this.all.push({number : i+1, free : true});
            }
            this.save();
        },
        save: function(){
            this._allP.post(this.all);
        },
        bookTable: function(tableNumber){
            this.all[tableNumber - 1].free = false;
        },
        freeTable: function(tableNumber){
            this.all[tableNumber - 1].free = true;
        }
    }
}]);