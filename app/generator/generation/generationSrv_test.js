describe('generateTournament', function(){
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
                {nbrPlayers: "4", nbrGroups: "2"},
                {nbrPlayers: "3", nbrGroups: "3"}
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
        service.generateTournament();
        expect(groupService.createdGroups.length).toBe(5);
        for(var i = 0; i < 3; i++){
            expect(groupService.createdGroups[i].players.length.toString()).toBe(groupService.createdGroups[i].nbrOfPlayers);
        }
    });

});
