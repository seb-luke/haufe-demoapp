import e = require("express");

export abstract class CommonRoutesConfig {
    protected app: e.Application;
    private readonly name: string;

    protected constructor(app: e.Application, name: string) {
        this.app = app;
        this.name = name;
        this.configureRoutes();
    }

    get routeName(): string {
        return this.name;
    }

    abstract configureRoutes(): e.Application;
}