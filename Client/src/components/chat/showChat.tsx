import type { ShowChatProps } from "../../props/chatProp";
import "../../assets/styles/chatPage.css";

export default function ShowChat({ messages, currentUserId }: ShowChatProps) {
  return (
    <div className="chatPage">
      <div className="chatBox">
        {messages.map((msg, index) => {
          const isOwn = msg.userId === currentUserId;
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
