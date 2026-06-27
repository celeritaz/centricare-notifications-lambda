import { PublishCommand } from "@aws-sdk/client-sns";
import { sns } from "../clients";

export async function sendSMS(phoneNumber: string, message: string) {
  await sns.send(
    new PublishCommand({
      PhoneNumber: phoneNumber,
      Message: message,
      MessageAttributes: {
        "AWS.SNS.SMS.SMSType": {
          DataType: "String",
          StringValue: "Transactional",
        },
      },
    }),
  );
}
