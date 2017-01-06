describe('getGroupsWithSelectedPlayers', function(){
    beforeEach(module('app'));

    var service;
    var data = [
        {
            number: 2,
            players: [
                {
                    name : 'A2',
                    position : 1
                },
                {
                    name : 'D2',
                    position : 4
                },
                {
                    name : 'B2',
                    position : 2
                },
                {
                    name : 'C2',
                    position : 3
                }
            ]
        },
        {
            number: 1,
            players: [
                {
                    name : 'A1',
                    position : 1
                },
                {
                    name : 'B1',
                    position : 2
                }
            ]
        },
        {
            number: 3,
            players: [
                {
                    name : 'D3',
                    position : 4
                },
                {
                    name : 'C3',
                    position : 3
                },
                {
                    name : 'B3',
                    position : 2
                },
                {
                    name : 'A3',
                    position : 1
                }
            ]
        }
    ];

    beforeEach(inject(function GetDependencies(groupsSrv){
        service = groupsSrv;
    }));

    it('should returns sorted groups', function () {
        var groups = service.getGroupsWithSelectedPlayers(2,2, data);
        expect(groups.length).toBe(3);
        expect(groups[0].group).toBe(1);
        expect(groups[1].group).toBe(2);
        expect(groups[2].group).toBe(3);
    });

    it('should filter and sort players', function () {
        var groups = service.getGroupsWithSelectedPlayers(2,2, data);
        expect(groups.length).toBe(3);

        expect(groups[0].players.length).toBe(1);
        expect(groups[0].players[0].name).toBe('B1');

        expect(groups[1].players.length).toBe(2);
        expect(groups[1].players[0].name).toBe('B2');
        expect(groups[1].players[1].name).toBe('C2');

        expect(groups[2].players.length).toBe(2);
        expect(groups[2].players[0].name).toBe('B3');
        expect(groups[2].players[1].name).toBe('C3');

    });

});