import { SNSClient, PublishCommand } from "@aws-sdk/client-sns";
import type { SNSEvent } from "aws-lambda";
import { NotificationPayload } from "./types";
import { sns } from "./clients";
import { sendSMS } from "./services/sms";
import { sendEmail } from "./services/email";

export const handler = async (event: SNSEvent) => {
  try {
    for (const record of event.Records) {
      const payload = JSON.parse(record.Sns.Message) as NotificationPayload;

      switch (payload.channel) {
        case "SMS":
          await sendSMS(payload.phoneNumber, payload.message);
          break;
        case "EMAIL":
          await sendEmail(payload.email, payload.subject, payload.message);
          break;
        case "WHATSAPP":
          console.log(`Sending WhatsApp message to ${payload.phoneNumber}`);
          break;
        default: {
          const exhaustiveCheck: never = payload;
          throw new Error(
            `Unhandled notification payload: ${JSON.stringify(exhaustiveCheck)}`,
          );
        }
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
