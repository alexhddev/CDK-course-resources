import { AuthService } from "./AuthService";


async function testAuth(){
    const service = new AuthService();
    const loginResult = await service.login(
        'barosanu',
        'sdf45aAf574fg)'
    )
    console.log(loginResult);
}

testAuth();