import e = require("express");
import * as http from "http";
import {BaseController} from "./controllers/common/base.controller";
import debug from "debug";
import cors = require("cors");
import * as winston from 'winston';
import * as expressWinston from 'express-winston';
import {HomeController} from "./controllers/home.controller";
import {LoggerFactory} from "./common/logger-factory";
import {HealthController} from "./controllers/health.controller";

const app: e.Application = e();
const server: http.Server = http.createServer(app);
const router: e.Router = e.Router();
const port = 3333;
const routes: BaseController[] = [];
const debugLog: debug.IDebugger = LoggerFactory.getLogger();
const contextPath = '/api';

const loggerOptions: expressWinston.LoggerOptions = {
    transports: [new winston.transports.Console()],
    format: winston.format.combine(
        winston.format.json(),
        winston.format.prettyPrint(),
        winston.format.colorize({ all: true })
    ),
};

if (!process.env.DEBUG) {
    loggerOptions.meta = false;
}

routes.push(new HomeController(router));
routes.push(new HealthController(router));

app.use(expressWinston.logger(loggerOptions));
app.use(cors());

app.use(contextPath, router);

server.listen(port, () => {
    console.log(`Webapp started on port ${port}`);
    routes.forEach((route: BaseController) => {
        debugLog(`Routes configured for ${route.routeName}`);
    });
})