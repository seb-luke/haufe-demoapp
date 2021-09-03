import e = require("express");
import {CommonRoutesConfig} from "./common/common.routes.config";

export class HomeRoutesConfig extends CommonRoutesConfig {

    constructor(app: e.Application) {
        super(app, 'HomeRoutes');
    }

    configureRoutes(): e.Application {
        this.app.route('/')
            .get((req: e.Request, res: e.Response) => {
                res.status(200).send('<h1>Hello World!</h1>')
            });

        return this.app;
    }
}