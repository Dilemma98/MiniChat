import { useEffect } from "react";
import "../../assets/styles/chosenpage.css";
import ShowChat from "./showChat";
// import type { Message } from "../../types/chat";
// import { socket } from "../../services/websocket";
import type { FetchChatProps } from "../../props/chatProp";
import {
  LIVE_URL, 
  // LOCAL_URL
} from "../../url";

export default function FetchChat({
  senderId,
  receiverId,
  fetchedMessages,
  setFetchedMessages,
}: FetchChatProps) {
  // const [fetchedMessages, setFetchedMessages] = useState<Message[]>([]);

  async function fetchChatById() {
    console.log("Fetching chat", senderId, receiverId);
    console.log("receiver", receiverId);
    try {
      const response = await fetch(
        `${LIVE_URL}/api/getConvoById/${senderId.id}/${receiverId.id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      const res = await response.json();
      console.log("Messages", res);
      if (setFetchedMessages) {
        setFetchedMessages(
          res.conversation.map((msg: any) => ({
            senderId: msg.sender_id,
            receiverId: msg.receiver_id,
            message: msg.message,
            userName: msg.user_name,
          })) || [],
        );
      }
    } catch {}
  }

  useEffect(() => {
    if (receiverId) {
      fetchChatById();
    }
  }, [receiverId]);

  return (
    <ShowChat
      chosenUserId={receiverId}
      currentUserId={senderId}
      messages={fetchedMessages || []}
      setFetchedMessages={setFetchedMessages}
    />
  );
}
