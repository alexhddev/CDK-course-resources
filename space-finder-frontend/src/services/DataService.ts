import { AuthService } from "./AuthService";


export class DataService {

    private authService: AuthService;

    constructor(authService: AuthService) {
        this.authService = authService;
    }


    public async createSpace(name: string, location:string, photo?: File){
        console.log('calling create space!!')
        const credentials = await this.authService.getTemporaryCredentials();
        console.log(credentials);
        return '123'
    }

    public isAuthorized(){
        return true;
    }
}