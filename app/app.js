'use strict';

angular.module('app', ['restangular', 'ngRoute']);

angular.module('app').config(['RestangularProvider', function(RestangularProvider){
    RestangularProvider.setBaseUrl('/data');
}]);

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

