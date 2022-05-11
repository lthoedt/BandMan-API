import { LoginDTO } from "../../dtos/LoginDTO";

export class Login {
    email: string = "";
    password: string = "";

    constructor(email: string, password: string) {
        this.email = email;
        this.password = password;
    }

    static fromDTO(loginDTO : LoginDTO): Login {
        try { return new Login(loginDTO.email, loginDTO.password) } catch { return null };
    }
}