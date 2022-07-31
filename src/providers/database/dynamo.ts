import { DynamoDB } from 'aws-sdk';
const dotenv = require('dotenv').config();
const options:DynamoDB.DocumentClient.DocumentClientOptions & DynamoDB.Types.ClientConfiguration = {
    region: dotenv.parsed.REGION
};

const offline = process.env.IS_OFFLINE;

if (offline) {
    options.region = 'us-west-2';
    options['endpoint'] = 'http://localhost:8000';
}


export default new DynamoDB.DocumentClient(options);