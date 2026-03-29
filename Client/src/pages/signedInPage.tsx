import type { SignedInProp } from "../props/signedInProp";
import { useState } from "react";
import Menu from "../components/signedIn/menu";
import ChatPage from "./chatPage";
import FriendsPage from "./friendsPage";
import SettingsPage from "./settingsPage";
import ChatMenu from "../components/chat/chatMenu";

export default function SignedIn({ user }: SignedInProp) {
  const [navTab, setNavTab] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  return (
    <div>
      {user ? (
        <div style={{ display: "flex"}}>
          <Menu user={user} onNavigate={setNavTab} />
          {navTab === "Chattar" && (
            <>
            <ChatPage selectedUser={selectedUser}/>
            <ChatMenu onSelectUser={setSelectedUser} />
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
