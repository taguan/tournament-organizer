describe('generateGroups', function(){
    beforeEach(module('app'));
    beforeEach(module({
        'groupsSrv': {
            createdGroups: [],
            create: function(groups){
                this.createdGroups = groups;
            }
        },
        'genPlayersSrv': {
            all:  [
                {name : 'e2', rank : 'e2'},
                {name : 'c0', rank : 'c0'},
                {name : 'c0', rank : 'c0'},
                {name : 'd0', rank : 'd0'},
                {name : 'nc', rank : 'nc'},
                {name : 'd2', rank : 'd2'},
                {name : 'd4', rank : 'd4'},
                {name : 'd4', rank : 'd4'},
                {name : 'd4', rank : 'd4'},
                {name : 'd4', rank : 'd4'},
                {name : 'd4', rank : 'd4'},
                {name : 'd4', rank : 'd4'},
                {name : 'd4', rank : 'd4'},
                {name : 'd4', rank : 'd4'},
                {name : 'd4', rank : 'd4'},
                {name : 'd4', rank : 'd4'},
                {name : 'd4', rank : 'd4'}
            ]

        },
        'groupsConfigsSrv': {
            all: [
                {nbrPlayers: 4, nbrGroups: 2},
                {nbrPlayers: 3, nbrGroups: 3}
            ]

        }
    }));

    var service;
    var groupService;

    beforeEach(inject(function GetDependencies(generationSrv, groupsSrv){
        service = generationSrv;
        groupService = groupsSrv;
    }));

    it('should generate fully attributed groups', function () {
        service.generateGroups();
        expect(groupService.createdGroups.length).toBe(5);
        for(var i = 0; i < 5; i++){
            expect(groupService.createdGroups[i].players.length).toBe(groupService.createdGroups[i].nbrOfPlayers);
        }
    });

    it('should generate groups sorted by player rank', function () {
        service.generateGroups();
        for(var i = 0; i < 5; i++){
            var groupPlayers = groupService.createdGroups[i].players;
            for(var j = 0; j < groupPlayers.length -1; j++){
                expect(groupPlayers[j].rank).not.toBeGreaterThan(groupPlayers[j+1].rank);
            }
        }
    });

});
