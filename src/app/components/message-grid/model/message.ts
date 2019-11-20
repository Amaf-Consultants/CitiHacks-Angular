export interface Message {
    msgId: string,
    userId: string,
    eventId: number,
    msgQuUserty: number,
    msgAppType: string,
    message: string,
    msgStatus: MessageStatus,
    msgCreateDate: string,
    msgUpdateDate: string,
    msgAttachement: string
}

export enum MessageStatus {
    Read = "Read",
    Answered = "Answered",
    Duplicate = "Duplicate",
    Reject = "Reject"
}