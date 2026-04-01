import type { Message } from "../types/chat";
import type { Dispatch, SetStateAction } from "react";

export type ShowChatProps = {
  chosenUserId: any;
  currentUserId: any;
  messages: Message[];
  setFetchedMessages?: Dispatch<SetStateAction<Message[]>>;

};
export type FetchChatProps = {
  senderId: any;
  receiverId: any;
  fetchedMessages?: Message[];
  setFetchedMessages?: Dispatch<SetStateAction<Message[]>>;
}
export type ChatMenuProps = {
  onSelectUser: (user: any) => void;
};
export type ChatPageProps = {
  selectedUser: any;
};

export type SendMessageProps = {
  senderUserId: number;
  receiverUserId: number;
  setFetchedMessages?: Dispatch<SetStateAction<Message[]>>;
  isTyping?: boolean;
  setIsTyping?: Dispatch<SetStateAction<boolean>>;
};