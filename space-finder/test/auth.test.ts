import { AuthService } from "./AuthService";


async function testAuth() {
    const service = new AuthService();
    const loginResult = await service.login(
        'barosanu',
        'Isdufhie354$'
    );
    const idToken = await service.getIdToken();
    // console.log(idToken);
    const credentials = await service.generateTemporaryCredentials();
    const a = 5;
    
}

testAuth();