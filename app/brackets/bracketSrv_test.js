describe('generateBracket', function(){
    beforeEach(module('app'));

    var service;

    beforeEach(inject(function GetDependencies(bracketSrv){
        service = bracketSrv;
    }));

    it('should generate an even bracket', function () {
        var generatedBracket = service.generateBracket(['p1', 'p2', 'p3', 'p4', 'p5', 'p6']);
        expect(generatedBracket.length).toBe(4);
        expect(generatedBracket[0][0]).toBe('p1');
        expect(generatedBracket[0][1]).toBe('Bye');
        expect(generatedBracket[1][0]).toBe('p4');
        expect(generatedBracket[1][1]).toBe('p5');
        expect(generatedBracket[2][0]).toBe('p2');
        expect(generatedBracket[2][1]).toBe('Bye');
        expect(generatedBracket[3][0]).toBe('p3');
        expect(generatedBracket[3][1]).toBe('p6');
    });

});