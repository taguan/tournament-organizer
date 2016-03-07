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
