import { AuthService } from "./AuthService";


async function testAuth() {
    const service = new AuthService();
    const loginResult = await service.login(
        'barosanu',
        'Isdufhie354$'
    );
    const idToken = await service.getIdToken();
    
}

testAuth();