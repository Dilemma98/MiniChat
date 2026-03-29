import SendIcon from "@mui/icons-material/Send";
import { useState, useRef } from "react";
import "../../assets/styles/chatPage.css";
import { socket } from "../../services/websocket";

export default function WriteMessage() {
  const inputRef = useRef<HTMLDivElement>(null);
  const [message, setMessage] = useState("");

  const handleSend = () => {
    if (!message.trim()) return;
    socket.emit("send_message", {
      userId: 1,
      message: message,
      user: "Dilemma"
    });
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
