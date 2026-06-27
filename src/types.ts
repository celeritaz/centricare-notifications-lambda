export type NotificationPayload =
  | {
      channel: "SMS";
      phoneNumber: string;
      message: string;
    }
  | {
      channel: "EMAIL";
      email: string;
      subject: string;
      message: string;
    }
  | {
      channel: "WHATSAPP";
      phoneNumber: string;
      message: string;
    };
