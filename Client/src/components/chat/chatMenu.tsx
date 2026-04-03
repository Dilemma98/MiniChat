import { useEffect, useState } from "react";
import "../../assets/styles/chatPage.css";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import type { ChatMenuProps } from "../../props/chatProp";
import {
  LIVE_URL,
  // LOCAL_URL
} from "../../url";

export default function ChatMenu({ onSelectUser, onlineUsers }: ChatMenuProps) {
  const [users, setUsers] = useState([]);
  const currentUser = JSON.parse(localStorage.getItem("user") || "{}");
  async function fetchAllUsers() {
    try {
      const response = await fetch(`${LIVE_URL}/api/allUsers`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const res = await response.json();
      console.log("USERS", res.users.data);
      const sortedUsers = res.users.data.sort((a: any, b: any) =>
        a.fname.localeCompare(b.fname),
      );
      setUsers(sortedUsers);
    } catch {}
  }

  useEffect(() => {
    fetchAllUsers();
  }, []);
  return (
    <div className="chatMenu">
      <div style={{ display: "flex", alignItems: "center", gap: "1em" }}>
        <h3 className="chatMenuHeader">Minichattare</h3>
      </div>
      <ul>
        {users.map((user: any) => {
          const isOnline = onlineUsers.includes(user.id);
          return (
            user.id !== currentUser.id && (
              <div className="item" key={user.id}  onClick={() => {
                    onSelectUser(user);
                    console.log("Selected user", user.id);
                  }}>
                <div className="avatar">
                  {user?.profilePicURL ? (
                    <img className="chatMenuPic" src={user?.profilePicURL} />
                  ) : (
                    <AccountCircleIcon />
                  )}
                  <span
                    className={`status ${isOnline ? "online" : "offline"}`}
                  ></span>
                </div>
                <li className="miniChatters"
                >
                  {user.fname} {user.lname}
                </li>
                <div className="icon">
                  <PersonAddIcon fontSize="small" />
                </div>
              </div>
            )
          );
        })}
      </ul>
    </div>
  );
}
