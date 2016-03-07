angular.module('app').factory('groupsSrv', ['Restangular', '$q', function(Restangular, $q){
    return {
        all: [],
        _allP: Restangular.all('groups'),
        findAll: function() {
            var deferred = $q.defer();
            var that = this;
            this._allP.getList().then(function(groupsResp){
                that.all = groupsResp;
                deferred.resolve(groupsResp);
            }, function(){
                that.all = [];
                deferred.resolve(that.all);
            });
            return deferred.promise;
        },
        create: function(groups){
            this.all = groups;
            this._allP.post(this.all);
        },
        save: function(){
            this._allP.post(this.all);
        }
    }
}]);