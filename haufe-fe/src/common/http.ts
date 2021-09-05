export class HTTP {

    // private static readonly BASE_URL: string = process.env.REACT_APP_BACKEND_URL ?? 'http://localhost:3000/api/';
    private static readonly BE_CONTEXT_PATH = 'api';
    private static readonly defaultProps: RequestInit = {
        mode: "same-origin",
    }

    public static get(path: string) {
        return fetch( this.BE_CONTEXT_PATH + path, this.defaultProps).then(resp => resp.json());
    }

    public static post(path: string, body: any) {
        const props: RequestInit = {
            ...this.defaultProps,
            method: 'POST',
            body: JSON.stringify(body)
        };

        return fetch(this.BE_CONTEXT_PATH + path, props).then(resp => resp.json());
    }
}