var expect = require('chai').expect;
var encrypted = require ('../../../../dist/node/infrastructure/decorators/encrypt');

describe('encryption decorator', () => {

    it('encrypt a value', () => {
        var testObject = { }

        encrypted.encrypted(testObject, 'testKey');
        testObject.testKey = 'test value';

        expect(testObject.testKey).to.equal('753549aed91d1a69c905');
        expect(testObject._testKey).to.exist;
        expect(testObject._testKey).to.equal('test value');
    });

    it('decrypt a value', () => {
        var testObject = { }

        encrypted.encrypted(testObject, 'testKey');
        //console.log(JSON.stringify(testObject));
            
    });
});