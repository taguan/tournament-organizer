angular.module('app').factory('tablesSrv', ['localStorageService', function(localStorageService){

    var all = localStorageService.get('tables') || [];

    return {
        all: all,
        generateTables: function(nbrOfTables){
            this.all = [];
            for(var i = 0; i < nbrOfTables; i++){
                this.all.push({number : i+1, free : true});
            }
            this.save();
        },
        save: function(){
            localStorageService.set('tables', this.all);
        },
        bookTable: function(tableNumber){
            this.all[tableNumber - 1].free = false;
        },
        freeTable: function(tableNumber){
            this.all[tableNumber - 1].free = true;
        }
    }
}]);