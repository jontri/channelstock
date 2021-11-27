export class UserAudit {
    userName: string;
    url: string;
    sourcePath: string;
    ipAddress: string;

    constructor(userName: string, url: string, sourceUrl: string, ipAddress: string) {
        this.userName = userName;
        this.url = url;
        this.sourcePath = sourceUrl;
        this.ipAddress = ipAddress;
    }
}
