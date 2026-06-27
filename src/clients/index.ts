import { SNSClient } from "@aws-sdk/client-sns";
import { SESClient } from "@aws-sdk/client-ses";

export const sns = new SNSClient({
  region: process.env.C_AWS_SNS_REGION,
});

export const ses = new SESClient({
  region: process.env.C_AWS_SES_REGION,
});
