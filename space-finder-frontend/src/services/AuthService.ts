


export class AuthService {


    public async login(userName: string, password: string):Promise<Object | undefined> {
        return {
            user: 'abc'
        }
    }

    public getUserName(){
        return 'some user'
    }
}