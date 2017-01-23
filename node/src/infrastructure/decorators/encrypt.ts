import crypto = require('crypto');

import Config from '../../config';

export default function encrypted(target: any, key: string) {
    // property value
    var _val = this[key];

    // property getter
    var getter = function () {
        console.log(`Get: ${key} => ${_val}`);
        //return decrypt(_val);
        return _val;
    };

    // property setter
    var setter = function (newVal: any) {
        console.log(`Set: ${key} => ${newVal}`);
        _val = encrypt(newVal);
    };

    // Delete property.
    if (delete this[key]) {

        // Create new property with getter and setter
        Object.defineProperty(target, key, {
        get: getter,
        set: setter,
        enumerable: true,
        configurable: true
        });
    }
}

function encrypt(value: any) {
    var config = new Config();

    var cipher = crypto.createCipher(config.algorithm, config.secret);
    var crypted = cipher.update(value, 'utf8', 'hex');
    crypted += cipher.final('hex');

    return crypted;
}

function decrypt(value:any) {
    var config = new Config();

    var decipher = crypto.createDecipher(config.algorithm, config.secret);
    var decrypted = decipher.update(value, 'hex', 'utf8')
    decrypted += decipher.final('utf8');
    return decrypted;
}