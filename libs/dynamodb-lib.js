import AWS from "aws-sdk";

console.log("provider region %s: ", (provider.region));

AWS.config.update({ region: (provider.region) });

export function call(action, params) {
  const dynamoDb = new AWS.DynamoDB.DocumentClient();

  return dynamoDb[action](params).promise();
}
