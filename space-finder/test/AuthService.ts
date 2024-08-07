import { Amplify } from 'aws-amplify'
import { SignInOutput, fetchAuthSession, signIn} from "@aws-amplify/auth";

const awsRegion = 'eu-west-1'

Amplify.configure({
    Auth: {
        Cognito: {
            userPoolId: 'eu-west-1_McLW8ACXS',
            userPoolClientId: '546p690f6q5bjurlvjdg73ador'
        }
    }
})

export class AuthService {

    public async login(userName: string, password: string) {
        const signInOutput: SignInOutput = await signIn({
            username: userName,
            password: password,
            options: {
                authFlowType: 'USER_PASSWORD_AUTH'
            }
        });
        return signInOutput;
    }

    /**
     * call only after login
     */
    public async getIdToken(){
        const authSession = await fetchAuthSession();
        return authSession.tokens?.idToken?.toString();

    }

}