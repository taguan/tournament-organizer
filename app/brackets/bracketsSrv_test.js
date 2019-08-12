describe('bracketSort', function(){
    beforeEach(module('app'));

    var service;

    beforeEach(inject(function GetDependencies(bracketsSrv){
        service = bracketsSrv;
    }));

    it('should sort an even bracket', function () {
        var generatedBracket = service.bracketSort(8);
        expect(generatedBracket.length).toBe(4);
        expect(generatedBracket[0][0]).toBe(0);
        expect(generatedBracket[0][1]).toBe(7);
        expect(generatedBracket[1][0]).toBe(3);
        expect(generatedBracket[1][1]).toBe(4);
        expect(generatedBracket[2][0]).toBe(1);
        expect(generatedBracket[2][1]).toBe(6);
        expect(generatedBracket[3][0]).toBe(2);
        expect(generatedBracket[3][1]).toBe(5);
    });

});

describe('generateBracket', function(){
    beforeEach(module('app'));

    var service;

    beforeEach(inject(function GetDependencies(bracketsSrv){
        service = bracketsSrv;
    }));

    it('should not duplicate player in a bracket', function () {
        // two brackets of 7 players, selecting 4 on each
        var brackets = service.generateBracket(      [{
                                            number: 1,
                                            players: [
                                                {
                                                    name : 'A1',
                                                    position : 1
                                                },
                                                {
                                                    name : 'A2',
                                                    position : 2
                                                },
                                                {
                                                    name : 'A3',
                                                    position : 3
                                                },
                                                {
                                                    name : 'A4',
                                                    position : 4
                                                },
                                                {
                                                    name : 'A5',
                                                    position : 5
                                                },
                                                {
                                                    name : 'A6',
                                                    position : 6
                                                },
                                                {
                                                    name : 'A7',
                                                    position : 7
                                                }
                                            ]
                                        },
                                        {
                                            number: 2,
                                            players: [
                                                {
                                                    name : 'B1',
                                                    position : 1
                                                },
                                                {
                                                    name : 'B2',
                                                    position : 2
                                                },
                                                {
                                                    name : 'B3',
                                                    position : 3
                                                },
                                                {
                                                    name : 'B4',
                                                    position : 4
                                                },
                                                {
                                                    name : 'B5',
                                                    position : 5
                                                },
                                                {
                                                    name : 'B6',
                                                    position : 6
                                                },
                                                {
                                                    name : 'B7',
                                                    position : 7
                                                }
                                            ]
                                        }
                                    ], 4)
        var flattenedBracket = brackets.flat(2);
        //this checks that there is no duplicate players (if there are there will be more elements in the array than in the Set)
        expect(flattenedBracket.length).toBe(new Set(flattenedBracket).size);
    });
});