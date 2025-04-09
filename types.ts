import { Chat, Message, User } from "./generated/prisma";

export interface UserType extends User {
  chats: Chat[];
}

export interface ChatType extends Chat {
  messages: Message[];
}
