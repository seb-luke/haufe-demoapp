import e = require("express");
import {BaseController} from "./common/base.controller";

export class HomeController extends BaseController {

    constructor(router: e.Router) {
        super(router, 'HomeController');
    }

    configureRoutes(): e.Router {
        this.router.route('/')
            .get((req: e.Request, res: e.Response) => {
                res.status(200).send('<h1>Hello Backend!</h1>')
            });

        return this.router;
    }
}