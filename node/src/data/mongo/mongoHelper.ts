import * as mongoose from 'mongoose';
import Config from '../../config';

let config = new Config();
const connection = mongoose.connect(config.mongodb);
(<any>mongoose).Promise = Promise;
export const Connection = connection;

export class MongoHelper {

    public static convert(from: any, to: any): any {
        for (let property in from) {
            if (from.hasOwnProperty(property)) {
                to[property] = from[property];
            }
        }

        return to;
    }

}
