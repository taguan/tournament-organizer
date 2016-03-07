angular.module('app').directive('trnmtTablesConfigEditor', function() {
    return {
        restrict: 'E',
        scope: {},
        templateUrl: 'generator/tables/tablesConfigEditor.html',
        controller: 'tablesConfigCtrl'
    };
});