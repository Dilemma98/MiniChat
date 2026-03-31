import FetchChat from "../components/chat/fetchChat";
import WriteMessage from "../components/chat/sendMessage";
import type { ChatPageProps } from "../props/chatProp";
import type { Message } from "../types/chat";
import { useState } from "react";

export default function ChatPage({selectedUser}: ChatPageProps) {
  const currentUser = JSON.parse(localStorage.getItem("user") || "{}");
  const [fetchedMessages, setFetchedMessages] = useState<Message[]>([]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "90%",
        maxWidth: "50em",
        margin: "0 auto",
        height: "80vh",
      }}
    >
      <div style={{ display: "flex", flexDirection: "row", height: "80vh"}}>
       {selectedUser && (
         <FetchChat receiverId={selectedUser} senderId={currentUser} fetchedMessages={fetchedMessages} setFetchedMessages={setFetchedMessages} />
       )}
      </div>
       {selectedUser && (
         <WriteMessage senderUserId={currentUser.id} receiverUserId={selectedUser.id} setFetchedMessages={setFetchedMessages} />
       )}
    </div>
  );
}
