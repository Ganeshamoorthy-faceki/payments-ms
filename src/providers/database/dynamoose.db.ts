import dynamoose from 'dynamoose';
import * as https from 'https';
const dotenv = require('dotenv').config();

let httpAgent:(https.Agent | undefined) = new https.Agent({
    rejectUnauthorized: true,
    keepAlive: true,
});

const offline = dotenv.parsed.IS_OFFLINE;
if (offline) httpAgent = undefined;

dynamoose.aws.sdk.config.update({
    region: dotenv.parsed.REGION || 'us-west-2',
    httpOptions: {
        agent: httpAgent,
    },
});

dynamoose.model.defaults.set({
    create: true,
    update: false,
    waitForActive: false,
});
console.log('connecting to DYnamoDB:::::')
// if (process.env.IS_OFFLINE) dynamoose.aws.ddb.local("http://localhost:8000");

export const DynamoDatabase = dynamoose;