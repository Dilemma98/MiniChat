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
    const currentUser = JSON.parse(userLs || "{}");

    socket.emit("send_message", {
      senderId: senderUserId,
      receiverId: receiverUserId,
      message: message,
      userName: JSON.parse(userLs || "{}").name,
      userProfilePic: currentUser.profilePic ?? null,
      createdAt: new Date().toISOString(),
    });

    if (setFetchedMessages) {
      setFetchedMessages((prev) => [
        ...prev,
        {
          senderId: senderUserId,
          receiverId: receiverUserId,
          message: message,
          userName: currentUser.name,
          userProfilePic: currentUser.profilePic ?? null,
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
            width={320}
            height={400}
            previewConfig={{ showPreview: false }}
            onEmojiClick={(e) => {
              setShowEmojiPicker(false);
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
        onInput={(e) => {
          setMessage(e.currentTarget.innerText ?? "");
          socket.emit("typing", {
            senderId: senderUserId,
            receiverId: receiverUserId,
          });
          console.log(
            "Typing event emitted from:",
            senderUserId,
            receiverUserId,
          );
        }}
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
