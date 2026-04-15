import FetchChat from "../components/chat/fetchChat";
import WriteMessage from "../components/chat/sendMessage";
import type { ChatPageProps } from "../props/chatProp";
import type { Message } from "../types/chat";
import { useState , useEffect} from "react";
import { socket } from "../services/websocket";

export default function ChatPage({ selectedUser }: ChatPageProps) {
  const currentUser = JSON.parse(localStorage.getItem("user") || "{}");
  const [fetchedMessages, setFetchedMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(true);

    useEffect(() => {
    socket.on("typing", ({ senderId }) => {
      console.log("SSENDER", selectedUser)
      if (senderId === selectedUser.id) {
        setTimeout(() => setIsTyping(true), 200);
        setTimeout(() => setIsTyping(false), 2000);
      }
    });
    return () => {
      socket.off("typing");
    };
    }, [selectedUser]);
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
      className="chatPageWrapper"
    >
      <div style={{ display: "flex", flexDirection: "row", height: "80vh" }}>
        {selectedUser && (
          <FetchChat
            receiverId={selectedUser}
            senderId={currentUser}
            fetchedMessages={fetchedMessages}
            setFetchedMessages={setFetchedMessages}
          />
        )}
      </div>
      {selectedUser && isTyping && (
    <div>
      <img src={selectedUser.profilePicUrl}/>
        <div className="isTypingBar">
        <div className="bubbleTyping">
          <span className="dot" />
          <span className="dot" />
          <span className="dot" />
        </div>
      </div>
      </div>
    )}
      {selectedUser && (
        <WriteMessage
          senderUserId={currentUser.id}
          receiverUserId={selectedUser.id}
          setFetchedMessages={setFetchedMessages}
          setIsTyping={setIsTyping}
          isTyping={isTyping}
        />
      )}
    </div>
  );
}
