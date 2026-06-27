import { SendEmailCommand } from "@aws-sdk/client-ses";
import { ses } from "../clients";

export async function sendEmail(to: string, subject: string, message: string) {
  const command = new SendEmailCommand({
    Source: "notification@celeritaz.com",
    Destination: {
      ToAddresses: [to],
    },
    Message: {
      Subject: {
        Data: subject,
        Charset: "UTF-8",
      },
      Body: {
        Html: {
          Data: message,
          Charset: "UTF-8",
        },
      },
    },
  });

  const response = await ses.send(command);

  console.log("Email sent successfully", {
    messageId: response.MessageId,
    recipient: to,
  });

  return response;
}
