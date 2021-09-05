import debug from "debug";

export class LoggerFactory {
    private static readonly LOGGER: debug.IDebugger = debug('haufe-be');

    public static getLogger(namespace?: string): debug.IDebugger {
        if (namespace) {
            return debug(namespace);
        }

        return LoggerFactory.LOGGER;
    }
}