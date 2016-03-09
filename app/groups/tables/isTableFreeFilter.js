angular.module('app').filter('isTableFree', function(){
    return function(arr){
        return arr.filter(function(table){
            return table.free;
        })
    }
});