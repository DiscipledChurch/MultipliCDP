export default class Config {
    public port: number;
    public mongodb: string;
    public secret: string;
    public algorithm: string;
    public host: string;
    public masterKey: string;

    constructor() {
        this.port = process.env.PORT || 8080;
        this.mongodb = '';
        this.secret = 'test';
        this.algorithm = 'aes-256-ctr';
        this.host = '';
        this.masterKey = '';
    }
}