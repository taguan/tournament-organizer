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