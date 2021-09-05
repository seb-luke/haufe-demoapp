import {BaseController} from "./common/base.controller";
import e from "express";
import {DatabaseConnection} from "../db/database-connection";
import {MongoClient} from "mongodb";
import {LoggerFactory} from "../common/logger-factory";

interface StatusMessage {
    status_code: number,
    status_message: string
}

export class HealthController extends BaseController{

    private static readonly LOGGER = LoggerFactory.getLogger();

    constructor(router: e.Router) {
        super(router, 'HealthController');
    }

    configureRoutes(): e.Router {
        this.router.route('/health')
            .get(HealthController.handleHealthGet)

        return this.router;
    }

    private static async handleHealthGet(_: e.Request, res: e.Response): Promise<void> {
        const errorMessage: StatusMessage = {
            status_code: 500,
            status_message: 'Could not connect to database'
        };

        let client: MongoClient;

        try {
            client = DatabaseConnection.getConnection();
        } catch (err: any) {
            HealthController.sendStatusResponse(res, 500, errorMessage);
            HealthController.LOGGER('Error getting connection:', err);
            return;
        }

        try {
            await client.connect();
            // connected without any error => healthy
            HealthController.sendStatusResponse(res, 200, {status_code: 200, status_message: 'App is healthy'});
        } catch (e) {
            HealthController.sendStatusResponse(res, 500, errorMessage);
            HealthController.LOGGER('Could not connect to the database', e);
            console.error('DB Connection failed');
        } finally {
            await client.close();
        }
    }

    private static sendStatusResponse(res: e.Response, statusCode: number, statusMessage: StatusMessage) {
        res.status(statusCode).contentType('application/json').send(JSON.stringify(statusMessage));
    }
}