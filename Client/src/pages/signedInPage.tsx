import type { SignedInProp } from "../props/signedInProp";
import { useState } from "react";
import Menu from "../components/signedIn/menu";
import ChatPage from "./chatPage";
import FriendsPage from "./friendsPage";
import SettingsPage from "./settingsPage";
import ChatMenu from "../components/chat/chatMenu";

export default function SignedIn({ user }: SignedInProp) {
  const [navTab, setNavTab] = useState("");
  return (
    <div>
      {user ? (
        <div style={{ display: "flex"}}>
          <Menu user={user} onNavigate={setNavTab} />
          {navTab === "Chattar" && (
            <>
            <ChatPage />
            <ChatMenu />
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
