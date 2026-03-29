import { useEffect, useState } from "react";
import "../../assets/styles/chosenpage.css";
import ShowChat from "./showChat";
import type { Message } from "../../types/chat";
import { socket } from "../../services/websocket";

export default function FetchChat() {
const [messages, setMessages] = useState<Message[]>([]);

useEffect(() => {
  const handleMessage = (data: any) => {
    setMessages(prev => [...prev, data]);
  };

  socket.on("receive_message", handleMessage);

  return () => {
    socket.off("receive_message", handleMessage);
  };
}, []);

  return ( <ShowChat messages={messages} currentUserId={1}/>);
}
