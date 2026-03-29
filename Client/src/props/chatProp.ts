import type { Message } from "../types/chat";

export type ShowChatProps = {
  messages: Message[];
  currentUserId: number;
};