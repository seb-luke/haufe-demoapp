import {MongoClient} from "mongodb";
import {LoggerFactory} from "../common/logger-factory";

export class DatabaseConnection {

    private static readonly CONNECTION_STRING: string|undefined = process.env.MONGO_CONNECTION_STRING;
    private static readonly LOGGER = LoggerFactory.getLogger();

    public static getConnection(): MongoClient {
        if (!this.CONNECTION_STRING) {
            this.LOGGER('Could not connect to the database because ' +
                'the environmental variable "MONGO_CONNECTION_STRING" is missing',)

            throw new Error('Env var MONGO_CONNECTION_STRING was not provided');
        }

        return new MongoClient(this.CONNECTION_STRING);
    }
}