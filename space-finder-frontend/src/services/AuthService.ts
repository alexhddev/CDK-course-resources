import { type CognitoUser } from '@aws-amplify/auth';
import { Amplify, Auth } from 'aws-amplify';
import { AuthStack } from '../../../space-finder/outputs.json';

const awsRegion = 'eu-west-1';

Amplify.configure({
    Auth: {
        mandatorySignIn: false,
        region: awsRegion,
        userPoolId: AuthStack.SpaceUserPoolId,
        userPoolWebClientId: AuthStack.SpaceUserPoolClientId,
        identityPoolId: AuthStack.SpaceIdentityPoolId,
        authenticationFlowType: 'USER_PASSWORD_AUTH'
    }
})

export class AuthService {

    private user: CognitoUser | undefined;

    public async login(userName: string, password: string):Promise<Object | undefined> {
        try {
            this.user = await Auth.signIn(userName, password) as CognitoUser;
            return this.user;
        } catch (error) {
            console.error(error);
            return undefined
        }
    }

    public getUserName(){
        return this.user?.getUsername();
    }
}