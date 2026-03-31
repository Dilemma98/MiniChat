import type { ShowChatProps } from "../../props/chatProp";
import "../../assets/styles/chatPage.css";
import { socket } from "../../services/websocket";
import { useEffect } from "react";

export default function ShowChat({
  messages,
  setFetchedMessages,
  chosenUserId,
  currentUserId,
}: ShowChatProps) {
  const handleReceiveMessage = (data: any) => {
    console.log("Received message:", data);

    if(data.senderId === currentUserId.id) return;
    if (setFetchedMessages) {
      setFetchedMessages((prevMessages) => [...prevMessages, data]);
    }

    return;
  };

  useEffect(() => {
    socket.on("receive_message", handleReceiveMessage);
    return () => {
      socket.off("receive_message", handleReceiveMessage);
    };
  }, []);
  return (
    <div className="chatPage">
      <div className="chatBox">
        {messages.length === 0
          ? chosenUserId && (
              <div className="messageRow">
                <p className="startConvo">
                  Starta en konversation med {chosenUserId.fname}!
                </p>
              </div>
            )
          : messages.map((msg, index) => {
              const isOwn = msg.senderId === currentUserId.id;
              const userName = msg.userName;
              return (
                <div
                  key={index}
                  className={`messageRow ${isOwn ? "own" : "other"}`}
                >
                  {!isOwn && <span className="userId"> {userName}</span>}
                  <div className="bubble">{msg.message}</div>
                </div>
              );
            })}
      </div>
    </div>
  );
}
