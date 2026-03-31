import "../assets/styles/menu.css";
import type { SignedInProp } from "../props/signedInProp";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import GroupIcon from "@mui/icons-material/Group";
import SettingsIcon from "@mui/icons-material/Settings";
// import MarkChatUnreadIcon from "@mui/icons-material/MarkChatUnread";

export default function Menu({ user, onNavigate }: SignedInProp) {
  return (
    <nav className="menu">
      <div className="menu-profile">
        <div className="avatar">
          <AccountCircleIcon />
          <span className="status online"></span>
        </div>

        <div className="user-info">
          <p className="name">{user?.name}</p>
        </div>
      </div>

      <ul>
        <li className="menuItem" onClick={() => onNavigate?.("Chattar")}>
          <ChatBubbleIcon fontSize="small" /> Chattar
          {/* If unread messages, show this icon */}
          {/* <MarkChatUnreadIcon fontSize="small" /> */}
        </li>
        <li className="menuItem" onClick={() => onNavigate?.("Vänner")}>
          <GroupIcon fontSize="small" /> Vänner
        </li>
        <li className="menuItem" onClick={() => onNavigate?.("Inställningar")}>
          <SettingsIcon fontSize="small" /> Inställningar
        </li>
      </ul>
    </nav>
  );
}
