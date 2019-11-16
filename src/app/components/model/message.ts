

export interface Message {
  MsgId: string;
  UserId: number;
  EventId: number;
  MsgQuality: number;
  MsgAppType: string;
  Message: string;
  MsgStatus: string;
  MsgCreateDate: Date;
  MsgUpdateDate: Date;
  MsgAttachement: any;
}
