import FetchChat from "../components/chat/fetchChat";
import WriteMessage from "../components/chat/sendMessage";

export default function ChatPage() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "90%",
        maxWidth: "50em",
        margin: "0 auto",
        height: "80vh",
      }}
    >
      <div style={{ display: "flex", flexDirection: "row", height: "80vh"}}>
        <FetchChat />
      </div>
        <WriteMessage />
    </div>
  );
}
