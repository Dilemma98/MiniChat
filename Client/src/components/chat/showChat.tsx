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
  const sortedMessages = [...messages].sort((a,b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
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
          : sortedMessages.map((msg, index) => {
              const isOwn = msg.senderId === currentUserId.id;
              const previousMsg = messages[index - 1];
              const showName =
                !previousMsg || previousMsg.senderId !== msg.senderId;

              return (
                <div
                  key={index}
                  className={`messageRow ${isOwn ? "own" : "other"}`}
                >
                  {!isOwn && showName && (
                    <p style={{ fontSize: "0.7em", marginBottom: "2px" }}>
                      {msg.userName}
                    </p>
                  )}
                  {/* Direkt rendera text med radbrytningar */}
                  <div className="bubble">{msg.message}</div>
                  <p style={{ fontSize: "0.7em", marginTop: "1px" }}>
                    {new Date(msg.createdAt).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              );
            })}
        <div ref={bottomRef} />
      </div>
    </div>
  );
}
