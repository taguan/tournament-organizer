angular.module('app').directive('trnmtGroupSection', function() {
    return {
        restrict: 'E',
        scope: {
            group: '='
        },
        templateUrl: 'groups/group/groupSection.html'
    };
});