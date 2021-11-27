export class UserAccount {
    role: string;
    name: string;
    userName: string;
    token: string;
    password: string;
    disabled: boolean;
    firstLogin: boolean;
    conditionsAgreed: boolean;
    tempAuth: boolean;

    constructor(role: string, name: string, userName: string, password: string, disabled: boolean, firstLogin: boolean, conditionsAgreed: boolean, tempAuth: boolean) {
        this.role = role;
        this.name = name;
        this.userName = userName;
        this.password = password;
        this.disabled = disabled;
        this.firstLogin = firstLogin;
        this.conditionsAgreed = conditionsAgreed;
        this.tempAuth = tempAuth;
    }
}
