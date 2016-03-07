angular.module('app').factory('generationSrv', [
    function(){
        return {
            generateTournament: function(){
                console.log('generating tournament');
            }
        };
    }]);