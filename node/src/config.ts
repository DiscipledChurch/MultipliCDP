export class Config {
    public port: number;
    public mongodb: string;
    public secret: string;
    public host: string;
    public masterKey: string;

    constructor() {
        this.port = process.env.PORT || 8080;
        this.mongodb = '';
        this.secret = '';
        this.host = '';
        this.masterKey = '';
    }
}
