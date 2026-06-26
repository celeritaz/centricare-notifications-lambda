import { SNSClient, PublishCommand } from "@aws-sdk/client-sns";
import type { SNSEvent } from "aws-lambda";
import { NotificationPayload } from "./types";

const sns = new SNSClient({
  region: process.env.C_AWS_SNS_REGION,
});

export const handler = async (event: SNSEvent) => {
  try {
    for (const record of event.Records) {
      const payload = JSON.parse(record.Sns.Message) as NotificationPayload;

      switch (payload.channel) {
        case "SMS":
          await sns.send(
            new PublishCommand({
              PhoneNumber: payload.phoneNumber as string,
              Message: payload.message,
              MessageAttributes: {
                "AWS.SNS.SMS.SMSType": {
                  DataType: "String",
                  StringValue: "Transactional",
                },
              },
            }),
          );
          break;
        case "EMAIL":
          console.log(`Sending email to ${payload.email}`);
          break;
        case "WHATSAPP":
          console.log(`Sending WhatsApp message to ${payload.phoneNumber}`);
          break;
        default:
          throw new Error(`Unsupported channel: ${payload.channel}`);
      }
    }

    return {
      statusCode: 200,
      body: "Notifications processed successfully",
    };
  } catch (error) {
    console.error("Notification processing failed:", error);
    throw error;
  }
};
