import {BaseController} from "./common/base.controller";
import e from "express";
import {DatabaseConnection} from "../db/database-connection";
import {MongoClient} from "mongodb";
import {LoggerFactory} from "../common/logger-factory";

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
        const errorMessage = {
            status_code: 500,
            status_message: 'Could not connect to database'
        };

        let client: MongoClient;

        try {
            client = DatabaseConnection.getConnection();
        } catch (err: any) {
            HealthController.sendErrorResponse(res, errorMessage);
            HealthController.LOGGER('Error getting connection:', err);
            return;
        }

        try {
            await client.connect();
            res.sendStatus(200);
        } catch (e) {
            HealthController.sendErrorResponse(res, errorMessage);
            HealthController.LOGGER('Could not connect to the database', e);
            console.error('DB Connection failed');
        } finally {
            await client.close();
        }
    }

    private static sendErrorResponse(res: e.Response, errorMessage: { status_message: string; status_code: number }) {
        res.status(500).contentType('application/json').send(JSON.stringify(errorMessage));
    }
}