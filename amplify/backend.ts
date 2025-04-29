import { RemovalPolicy, Tags } from "aws-cdk-lib";
import { auth } from "./auth/resource";
import { storage } from "./storage/resource";
import { defineBackend } from "@aws-amplify/backend";
import ci from "ci-info";
import { Duration } from "aws-cdk-lib";
import * as s3 from "aws-cdk-lib/aws-s3";

let AMPLIFY_GEN_1_ENV_NAME = process.env.AMPLIFY_GEN_1_ENV_NAME;
if (ci.isCI && !AMPLIFY_GEN_1_ENV_NAME) {
    throw new Error("AMPLIFY_GEN_1_ENV_NAME is required in CI environment");
}
else if (!ci.isCI && !AMPLIFY_GEN_1_ENV_NAME) {
    AMPLIFY_GEN_1_ENV_NAME = "sandbox";
}

const backend = defineBackend({
    auth,
    storage
});
const cfnUserPool = backend.auth.resources.cfnResources.cfnUserPool;
cfnUserPool.userPoolName = `testrefactorstorage7cfedadc_userpool_7cfedadc-${AMPLIFY_GEN_1_ENV_NAME}`;
cfnUserPool.usernameAttributes = undefined;
cfnUserPool.policies = {
    passwordPolicy: {
        minimumLength: 8,
        requireLowercase: false,
        requireNumbers: false,
        requireSymbols: false,
        requireUppercase: false,
        temporaryPasswordValidityDays: 7
    }
};
const cfnIdentityPool = backend.auth.resources.cfnResources.cfnIdentityPool;
cfnIdentityPool.identityPoolName = `testrefactorstorage7cfedadc_identitypool_7cfedadc__${AMPLIFY_GEN_1_ENV_NAME}`;
const userPool = backend.auth.resources.userPool;
const userPoolClient = userPool.addClient("NativeAppClient", {
    disableOAuth: true,
    authSessionValidity: Duration.minutes(3),
    userPoolClientName: "testre7cfedadc_app_client",
    enablePropagateAdditionalUserContextData: false,
    enableTokenRevocation: true,
    refreshTokenValidity: Duration.days(30),
    generateSecret: false
});
const s3Bucket = backend.storage.resources.cfnResources.cfnBucket;
s3Bucket.bucketName = `testrefactorstorage66aaab78025d420d93475d1ebbcc6c6d9-${AMPLIFY_GEN_1_ENV_NAME}`;
s3Bucket.bucketEncryption = {
    serverSideEncryptionConfiguration: [
        {
            serverSideEncryptionByDefault: {
                sseAlgorithm: "AES256"
            },
            bucketKeyEnabled: false
        }
    ]
};
Tags.of(backend.stack).add("gen1-migrated-app", "true");
