import { Config } from '@jest/types'

const baseTestDir = '<rootDir>/test/services';

const config: Config.InitialOptions = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    testMatch:[
        `${baseTestDir}/**/*test.ts`
    ]

}

export default config;