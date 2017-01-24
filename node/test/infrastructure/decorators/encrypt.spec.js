var expect = require('chai').expect;
var Encryption = require('../../../../dist/node/infrastructure/decorators/encrypt');

describe('encryption decorator', () => {

    it('encrypt and decrypt a value', () => {
        var testObj = { }

        Encryption.encrypted(testObj, 'testKey');
        testObj.testKey = 'test value';

        expect(testObj.testKey).to.equal('753549aed91d1a69c905');
        expect(testObj.encryptedKeys).to.exist;
        expect(testObj.encryptedKeys).to.include('testKey');
        expect(testObj._testKey).to.exist;
        expect(testObj._testKey).to.equal('test value');

    });
});