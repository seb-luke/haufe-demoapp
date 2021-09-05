import e = require("express");

export abstract class BaseController {
    protected router: e.Router;
    private readonly name: string;

    protected constructor(router: e.Router, name: string) {
        this.router = router;
        this.name = name;
        this.configureRoutes();
    }

    get routeName(): string {
        return this.name;
    }

    abstract configureRoutes(): e.Router;
}