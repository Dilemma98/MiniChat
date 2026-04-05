import React from "react";
import type { ShowChatProps } from "../../props/chatProp";
import "../../assets/styles/chatPage.css";
import { socket } from "../../services/websocket";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import LoadingComponent from "../loadingComponent";

export default function ShowChat({
  messages,
  setFetchedMessages,
  chosenUserId,
  currentUserId,
  loading,
  setLoading
}: ShowChatProps) {
  const bottomRef = useRef<HTMLDivElement | null>(null);
  const chatBoxRef = useRef<HTMLDivElement | null>(null);
  const sortedMessages = [...messages].sort(
    (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
  );
  const [isRead, setIsRead] = useState(false);

  const handleReceiveMessage = (data: any) => {
    if (data.senderId !== chosenUserId.id) return;
    if (setFetchedMessages) {
      setFetchedMessages((prevMessages) => [...prevMessages, data]);
    }
  };

  useEffect(() => {
    socket.on("receive_message", handleReceiveMessage);
    return () => {
      socket.off("receive_message", handleReceiveMessage);
    };
  }, [currentUserId, chosenUserId]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (messages.length > 0 && chosenUserId) {
      socket.emit("read", {
        senderId: currentUserId.id,
        receiverId: chosenUserId.id,
      });
    }
  }, [messages]);

  useEffect(() => {
    socket.on("isRead", ({ senderId }) => {
      if (senderId === chosenUserId.id) setIsRead(true);
    });
    return () => {
      socket.off("isRead");
    };
  }, [chosenUserId]);

  useEffect(() => {
    setIsRead(false);
  }, [chosenUserId]);

  useLayoutEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [messages]);

  const formatDate = (date: Date) => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);
    if (date.toDateString() === today.toDateString()) return "Idag";
    if (date.toDateString() === yesterday.toDateString()) return "Igår";
    return date.toLocaleDateString("sv-SE", { day: "numeric", month: "long" });
  };

  return (
    <div className="chatPage">
      {chosenUserId && (
        <div className="chatHeader">
          {chosenUserId.profilePicURL ? (
            <img
              src={chosenUserId.profilePicURL}
              style={{
                width: 32,
                height: 32,
                borderRadius: "50%",
                objectFit: "cover",
              }}
            />
          ) : (
            <div className="chatHeaderAvatar">
              <p>{chosenUserId.fname?.charAt(0).toUpperCase()}</p>
            </div>
          )}
          <span className="chatHeaderName">{chosenUserId.fname}</span>
        </div>
      )}
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
              const previousMsg = sortedMessages[index - 1];
              const isLast = index === sortedMessages.length - 1;
              const msgDate = new Date(msg.createdAt);
              const prevDate = previousMsg
                ? new Date(previousMsg.createdAt)
                : null;
              const showDateDivider =
                !prevDate || msgDate.toDateString() !== prevDate.toDateString();

              const avatar = (
                src: string | null,
                fallback: string | undefined,
              ) => (
                <div style={{ flexShrink: 0, marginTop: 2 }}>
                  {src ? (
                    <img
                      src={src}
                      style={{
                        width: 24,
                        height: 24,
                        borderRadius: "50%",
                        objectFit: "cover",
                      }}
                    />
                  ) : (
                    <span
                      style={{
                        width: 24,
                        height: 24,
                        borderRadius: "50%",
                        background: "#F4C0D1",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "0.7em",
                        color: "#72243E",
                      }}
                    >
                      {fallback?.charAt(0).toUpperCase()}
                    </span>
                  )}
                </div>
              );

              return (
                <React.Fragment key={index}>
                  {showDateDivider && (
                    <div className="dateDivider">
                      <span>{formatDate(msgDate)}</span>
                    </div>
                  )}

                  <div className={`messageRow ${isOwn ? "own" : "other"}`}>
                    {isOwn ? (
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          alignItems: "flex-start",
                          gap: 6,
                          justifyContent: "flex-end",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "flex-end",
                          }}
                        >
                          <div className="bubble">{msg.message}</div>
                          <p style={{ fontSize: "0.7em", marginTop: "1px" }}>
                            {new Date(msg.createdAt).toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </p>
                          {isRead && isLast && (
                            <p style={{ fontSize: "0.7em", marginTop: "1px" }}>
                              Läst
                            </p>
                          )}
                        </div>
                      </div>
                    ) : (
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          alignItems: "flex-start",
                          gap: 6,
                        }}
                      >
                        {avatar(msg.userProfilePic ?? null, msg.userName)}
                        <div
                          style={{ display: "flex", flexDirection: "column" }}
                        >
                          <div className="bubble">{msg.message}</div>
                          <p style={{ fontSize: "0.7em", marginTop: "1px" }}>
                            {new Date(msg.createdAt).toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </React.Fragment>
              );
            })}
        <div ref={bottomRef} />
         {  loading && (
          <LoadingComponent />
        )}
      </div>
    </div>
  );
}
