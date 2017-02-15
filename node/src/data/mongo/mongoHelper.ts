import * as mongoose from 'mongoose';
import Schema = mongoose.Schema;
import Config from '../../config';

let config = new Config();
const connection = mongoose.connect(config.mongodb);
(<any>mongoose).Promise = Promise;
export const Connection = connection;

export class MongoHelper {

    public static convert(from: any, to: any) : any {
        for (var property in from) {
            if (from.hasOwnProperty(property)) {
                to[property] = from[property];
            }
        }

        return to;
    }

}