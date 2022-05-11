export class LoginDTO {

    email: string;
    password: string;

    static fromJSON(json: any): LoginDTO {
        try {
            const loginDTO: LoginDTO = new LoginDTO;

            loginDTO.email = json.email;
            loginDTO.password = json.password;
            
            return loginDTO;
        } catch {
            return null;
        }
    }
}