import crypto = require('crypto');

import Config from '../../config';


export function encrypted(target: any, key: string) {
    var getType = {};
    var obj = (this.encrypted && getType.toString.call(this.encrypted) === '[object Function]') ? target : this;

    // property value
    var _val = obj[key];

    // property getter
    var getter = function () {
        //console.log(`Get: ${key} => ${_val}`);
        //return decrypt(_val);
        return _val;
    };

    // property setter
    var setter = function (newVal: any) {
        //console.log(`Set: ${key} => ${newVal}`);
        _val = encrypt(newVal);
    };

    // Delete property.
    if ((delete obj[key]) && (delete obj['_' + key])) {

        // Create new property with getter and setter
        Object.defineProperty(target, key, {
            get: getter,
            set: setter,
            enumerable: true,
            configurable: true
        });

        // Create a new 'pointer' property that, for UI, 
        // - decrypts when reading
        // - saves to main property when setting
        Object.defineProperty(target, '_' + key, {
            get: function() { return decrypt(_val); },
            set: setter,
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
