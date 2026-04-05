import { useEffect, useState } from "react";
import ShowChat from "./showChat";
import type { FetchChatProps } from "../../props/chatProp";
import { LIVE_URL } from "../../url";

export default function FetchChat({
  senderId,
  receiverId,
  fetchedMessages,
  setFetchedMessages,
}: FetchChatProps) {
  const [loading, setLoading] = useState(false);
  async function fetchChatById() {
    try {
      setLoading(true);
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
      if (setFetchedMessages) {
        setFetchedMessages(
          res.conversation.map((msg: any) => ({
            senderId: msg.sender_id,
            receiverId: msg.receiver_id,
            message: msg.message,
            userName: msg.users.fname,
            createdAt: msg.created_at,
            userProfilePic: msg.users.profilePicURL,
          })) || [],
        );
      }
    } catch {}
    finally{
      setLoading(false);
    }
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
      loading={loading}
      setLoading={setLoading}
      // profilePicUrl={profilePicUrl}
    />
  );
}
