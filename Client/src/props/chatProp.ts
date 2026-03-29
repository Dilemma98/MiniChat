import type { Message } from "../types/chat";

export type ShowChatProps = {
  chosenUserId: any;
  currentUserId: any;
  messages: Message[];
};
export type FetchChatProps = {
  senderId: any;
  receiverId: any;
}
export type ChatMenuProps = {
  onSelectUser: (user: any) => void;
}
export type ChatPageProps = {
  selectedUser: any;
}