export interface Message {
    MsgId: string,
    UserId: string,
    EventId: number,
    MsgQuUserty: number,
    MsgAppType: string,
    Message: string,
    MsgStatus: MessageStatus,
    MsgCreateDate: string,
    MsgUpdateDate: string,
    MsgAttachement: string
}

export enum MessageStatus {
    Read = "Read",
    Accepted = "Accepted",
    Duplicate = "Duplicate",
    Rejected = "Rejected",
    Deleted = "Deleted"
}