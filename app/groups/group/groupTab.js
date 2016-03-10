angular.module('app').directive('trnmtGroupTab', function() {
    return {
        restrict: 'E',
        scope: {
            group: '='
        },
        templateUrl: 'groups/group/groupTab.html',
        controller: 'groupTabCtrl'
    };
});