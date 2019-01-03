'use strict';

angular.module('app', ['ngRoute', 'LocalStorageModule']);

angular.module('app').config(function (localStorageServiceProvider) {
  localStorageServiceProvider
    .setPrefix(window.location.href); // this is a trick to allow having the application multiple times in different folder
    // and to not share the data between those folders
});

angular.module('app').value('isPositiveNumber', function(nbrStr){
    if(!nbrStr) return false;
    var nbr = parseInt(nbrStr);
    return nbr && nbr > 0;
});

angular.module('app').filter('range', function() {
    return function(input, min, max) {
        min = parseInt(min);
        max = parseInt(max);
        for (var i=min; i<=max; i++)
            input.push(i);
        return input;
    };
});

