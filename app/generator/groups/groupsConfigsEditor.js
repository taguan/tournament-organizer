angular.module('app').directive('trnmtGroupsConfigsEditor', function() {
    return {
        restrict: 'E',
        scope: {},
        templateUrl: 'generator/groups/groupsConfigsEditor.html',
        controller: 'groupsConfigsCtrl'
    };
});