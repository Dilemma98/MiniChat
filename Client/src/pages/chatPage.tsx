import FetchChat from "../components/chat/fetchChat";
import WriteMessage from "../components/chat/sendMessage";
import type { ChatPageProps } from "../props/chatProp";

export default function ChatPage({selectedUser}: ChatPageProps) {
  const currentUser = JSON.parse(localStorage.getItem("user") || "{}");

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
       {selectedUser && (
         <FetchChat receiverId={selectedUser} senderId={currentUser} />
       )}
      </div>
       {selectedUser && (
         <WriteMessage />
       )}
    </div>
  );
}
