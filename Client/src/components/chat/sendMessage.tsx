import SendIcon from "@mui/icons-material/Send";
import { useState, useRef } from "react";
import "../../assets/styles/chatPage.css";
import { socket } from "../../services/websocket";
import type { SendMessageProps } from "../../props/chatProp";
import EmojiPicker from "emoji-picker-react";

export default function WriteMessage({
  senderUserId,
  receiverUserId,
  setFetchedMessages,
}: SendMessageProps) {
  const inputRef = useRef<HTMLDivElement>(null);
  const [message, setMessage] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const userLs = localStorage.getItem("user");

  const handleSend = () => {
    if (!message.trim()) return;

    // Skicka meddelandet som en vanlig text med radbrytningar (\n)
    socket.emit("send_message", {
      senderId: senderUserId,
      receiverId: receiverUserId,
      message: message, // Radbrytningar sparas som text (\n)
      userName: JSON.parse(userLs || "{}").name,
      createdAt: new Date().toISOString(),
    });

    if (setFetchedMessages) {
      setFetchedMessages((prev) => [
        ...prev,
        {
          senderId: senderUserId,
          receiverId: receiverUserId,
          message: message, // Skicka med meddelandet med radbrytningar
          userName: JSON.parse(userLs || "{}").name,
          createdAt: new Date().toISOString(),
        },
      ]);
    }

    console.log("MESSAGE SENT FROM USER", JSON.parse(userLs || "{}").name);
    setMessage("");
    if (inputRef.current) inputRef.current.textContent = "";
  };

  return (
    <div className="inputWrapper">
      {showEmojiPicker && (
        <div className="emojiPickerWrapper">
          <EmojiPicker
            width={300}
            height={400}
            onEmojiClick={(e) => {
              const emoji = e.emoji;
              setMessage((prev) => prev + emoji);
              if (inputRef.current) inputRef.current.textContent += emoji;
            }}
          />
        </div>
      )}
      <div
        ref={inputRef}
        contentEditable
        suppressContentEditableWarning
        onInput={(e) => setMessage(e.currentTarget.innerText ?? "")}
        className="textArea"
        data-placeholder="Skriv ett meddelande..."
      />
      <button
        className="emojiBtn"
        onClick={() => setShowEmojiPicker((prev) => !prev)}
      >
        😊
      </button>
      <button
        className="sendBtn"
        onClick={handleSend}
        disabled={!message.trim()}
      >
        <SendIcon fontSize="small" />
      </button>
    </div>
  );
}
