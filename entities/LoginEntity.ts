import LoginDTO from "../dtos/LoginDTO";

export default class LoginEntity {
    email: string = "";
    password: string = "";

    constructor(email: string, password: string) {
        this.email = email;
        this.password = password;
    }

    static fromDTO(loginDTO : LoginDTO): LoginEntity {
        return new LoginEntity(loginDTO.email, loginDTO.password);
    }
}