import { Chat, User } from "./generated/prisma";

export interface UserType extends User {
  chats: Chat[];
}
