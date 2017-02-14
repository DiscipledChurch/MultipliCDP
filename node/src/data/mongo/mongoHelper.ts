import * as mongoose from 'mongoose';
import Schema = mongoose.Schema;
import Config from '../../config';

let config = new Config();
const connection = mongoose.connect(config.mongodb);
(<any>mongoose).Promise = Promise;
export const Connection = connection;

export class MongoHelper {

    public static convert<T, U>(from: T) : U {
        var tmp: U;
        return tmp;
    }

}