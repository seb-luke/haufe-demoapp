import e = require("express");
import {CommonRoutesConfig} from "./common/common.routes.config";

export class HomeRoutesConfig extends CommonRoutesConfig {

    constructor(router: e.Router) {
        super(router, 'HomeRoutes');
    }

    configureRoutes(): e.Router {
        this.router.route('/')
            .get((req: e.Request, res: e.Response) => {
                res.status(200).send('<h1>Hello Backend!</h1>')
            });

        return this.router;
    }
}