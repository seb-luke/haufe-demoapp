import e = require("express");
import * as http from "http";
import {CommonRoutesConfig} from "./routes/common/common.routes.config";
import debug from "debug";
import cors = require("cors");
import * as winston from 'winston';
import * as expressWinston from 'express-winston';
import {HomeRoutesConfig} from "./routes/home.routes.config";

const app: e.Application = e();
const server: http.Server = http.createServer(app);
const router: e.Router = e.Router();
const port = 3333;
const routes: CommonRoutesConfig[] = [];
const debugLog: debug.IDebugger = debug('haufe-be');
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

routes.push(new HomeRoutesConfig(router));

app.use(expressWinston.logger(loggerOptions));
app.use(cors());

app.use(contextPath, router);

server.listen(port, () => {
    console.log(`Webapp started on port ${port}`);
    routes.forEach((route: CommonRoutesConfig) => {
        debugLog(`Routes configured for ${route.routeName}`);
    });
})