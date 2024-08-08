import { Amplify } from 'aws-amplify';
import { SignInOutput, fetchAuthSession, signIn } from '@aws-amplify/auth';
import { AuthStack } from '../../../space-finder/outputs.json'

const awsRegion = 'eu-west-1';

Amplify.configure({
    Auth: {
      Cognito: {
        userPoolId: AuthStack.SpaceUserPoolId,
        userPoolClientId: AuthStack.SpaceUserPoolClientId,
        identityPoolId: AuthStack.SpaceIdentityPoolId
      },
    },
  });

export class AuthService {

    private user: SignInOutput | undefined;
    private userName: string = '';


    public async login(userName: string, password: string):Promise<Object | undefined> {
        try {
            const signInOutput: SignInOutput = await signIn({
                username: userName,
                password: password,
                options: {
                    authFlowType: 'USER_PASSWORD_AUTH'
                }
            });
            this.user = signInOutput;
            this.userName = userName;
            return this.user;
        } catch (error) {
            console.error(error);
            return undefined
        }
    }

    public getUserName(){
        return this.userName
    }
}