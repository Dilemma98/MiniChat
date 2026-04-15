import type { SignedInProp } from "../props/signedInProp";
import { useState, useEffect } from "react";
import Menu from "../components/menu";
import ChatPage from "./chatPage";
import FriendsPage from "./friendsPage";
import SettingsPage from "./settingsPage";
import ChatMenu from "../components/chat/chatMenu";
import {socket} from "../services/websocket";
import CuteAnimations from "../components/cuteAnimations";
// import FriendsMenu from "../components/friends/friendsMenu";
export default function SignedIn({ user }: SignedInProp) {
  const [navTab, setNavTab] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState<string[]>([]);
  
  useEffect(() => {
  socket.auth = { userId: user?.id };
  socket.connect();
  
  return () => {
    socket.disconnect();
  };
}, [user]);

useEffect(() => {
  socket.on("online_users", (users) => {
    setOnlineUsers(users);
    console.log("Online", selectedUser)
  });
  return () => {
    socket.off("online_users");
  }
},[])

  return (
    <div>
      {user ? (
        <div style={{ display: "flex", width: "100%" }}>
          <Menu user={user} onNavigate={setNavTab} navTab={navTab} />
          {navTab === "Chattar" && (
            <>
            {/* <FriendsMenu /> */}
            <ChatPage selectedUser={selectedUser}/>
            {!selectedUser &&(
              <CuteAnimations />
            )}
            <ChatMenu onSelectUser={setSelectedUser} onlineUsers={onlineUsers} />
            </>
          )}
          {navTab === "Vänner" && (
            <FriendsPage />
          )}
          {navTab === "Inställningar" && (
            <SettingsPage />
          )}
        </div>
      ) : (
        <>
          <p>Logga in för att chatta</p>
        </>
      )}
    </div>
  );
}
