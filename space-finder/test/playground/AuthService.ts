import { type CognitoUser } from '@aws-amplify/auth';
import { Amplify, Auth } from 'aws-amplify';
import { CognitoIdentityClient } from '@aws-sdk/client-cognito-identity';
import { fromCognitoIdentityPool } from '@aws-sdk/credential-providers'

const awsRegion = 'eu-west-1'

Amplify.configure({
    Auth: {
        region: awsRegion,
        userPoolId: 'eu-west-1_dzrtjSrKx',
        userPoolWebClientId: '5a1o8t924hrt56tkt3bl102mbo',
        identityPoolId: 'eu-west-1:5b2b0567-17ce-4070-b540-3e4688c46f43',
        authenticationFlowType: 'USER_PASSWORD_AUTH'
    }
});



export class AuthService {

    public async login(userName: string, password: string) {
        const result = await Auth.signIn(userName, password) as CognitoUser;
        return result;
    }

    public async generateTemporaryCredentials(user: CognitoUser){
        const jwtToken = user.getSignInUserSession().getIdToken().getJwtToken();
        const cognitoIdentityPool = `cognito-idp.${awsRegion}.amazonaws.com/eu-west-1_azOXLiuLi`;
        const cognitoIdentity = new CognitoIdentityClient({
            credentials: fromCognitoIdentityPool({
                identityPoolId: 'eu-west-1:5b2b0567-17ce-4070-b540-3e4688c46f43',
                logins: {
                    [cognitoIdentityPool]: jwtToken
                }
            })
        });
        const credentials = await cognitoIdentity.config.credentials();
        return credentials;
    }
}