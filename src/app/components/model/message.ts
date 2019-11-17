

export interface Message {
  msgId: string;
  userId: number;
  eventId: number;
  msgQuality: number;
  msgAppType: string;
  message: string;
  msgStatus: string;
  msgCreateDate: Date;
  msgUpdateDate: Date;
  msgAttachement: any;
}
