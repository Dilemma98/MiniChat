import SendIcon from "@mui/icons-material/Send";
import { useState, useRef } from "react";
import "../../assets/styles/chatPage.css";
import { socket } from "../../services/websocket";
import type { SendMessageProps } from "../../props/chatProp";

export default function WriteMessage({ senderUserId, receiverUserId, setFetchedMessages }: SendMessageProps) {
  const inputRef = useRef<HTMLDivElement>(null);
  const [message, setMessage] = useState("");

  const handleSend = () => {
    if (!message.trim()) return;
    socket.emit("send_message", {
      senderId: senderUserId,
      receiverId: receiverUserId,
      message: message,
      userName: JSON.parse(localStorage.getItem("user") || "{}").fname,
    });
   if(setFetchedMessages){
     setFetchedMessages(prev => [...prev, {
      senderId: senderUserId,
      receiverId: receiverUserId,
      message: message,
      userName: JSON.parse(localStorage.getItem("user") || "{}").fname,
    }]);
   }
    setMessage("");
    if(inputRef.current) inputRef.current.textContent = "";
  };

  return (
    <div className="inputWrapper">
      <div
        ref={inputRef}
        contentEditable
        suppressContentEditableWarning
        onInput={(e) => setMessage(e.currentTarget.textContent ?? "")}
        className="textArea"
        data-placeholder="Skriv ett meddelande..."
      />
      <button className="sendBtn" onClick={handleSend} disabled={!message.trim()}>
        <SendIcon fontSize="small" />
      </button>
    </div>
  );
}
