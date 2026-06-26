export interface NotificationPayload {
  channel: "SMS" | "EMAIL" | "WHATSAPP";
  phoneNumber?: string;
  email?: string;
  subject?: string;
  message: string;
}