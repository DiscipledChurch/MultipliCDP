export default class Config {
    public port: number;
    public mongodb: string;
    public secret: string;
    public algorithm: string;
    public host: string;
    public masterKey: string;

    constructor() {
        this.port = process.env.PORT || 8080;
        this.mongodb = 'mongodb://testuser:CFT^6yhn@ds161495.mlab.com:61495/multiplitest';
        this.secret = 'test';
        this.algorithm = 'aes-256-ctr';
        this.host = '';
        this.masterKey = '';
    }
}
