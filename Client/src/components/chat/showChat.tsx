import type { ShowChatProps } from "../../props/chatProp";
import "../../assets/styles/chatPage.css";
import { socket } from "../../services/websocket";
import { useEffect, useRef } from "react";
import { useLayoutEffect } from "react";

export default function ShowChat({
  messages,
  setFetchedMessages,
  chosenUserId,
  currentUserId,
}: ShowChatProps) {
  const bottomRef = useRef<HTMLDivElement | null>(null);
  const chatBoxRef = useRef<HTMLDivElement | null>(null);
  const handleReceiveMessage = (data: any) => {
    console.log("Received message:", data);

    if (data.senderId === currentUserId.id) return;
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
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

useLayoutEffect(() => {
  if (chatBoxRef.current) {
    chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
  }
}, [messages]);
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
        <div ref={bottomRef} />
      </div>
    </div>
  );
}
