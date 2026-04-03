import { useEffect, useState } from "react";
import "../../assets/styles/chatPage.css";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import type { ChatMenuProps } from "../../props/chatProp";
import {
  LIVE_URL,
  // LOCAL_URL
} from "../../url";

const mockedUsers = [
  { id: 1, fname: "Anna", lname: "Andersson", isOnline: true },
  { id: 2, fname: "Kalle", lname: "Karlsson", isOnline: false },
  { id: 3, fname: "Peter", lname: "Pettersson", isOnline: false },
  { id: 4, fname: "Oskar", lname: "Oskarsson", isOnline: true },
];

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
        {currentUser.id === 34 &&
          mockedUsers.map(
            (user: any) =>
              user.id !== currentUser.id && (
                <div
                  className="item"
                  key={user.id}
                  onClick={() => {
                    onSelectUser(user);
                    console.log("Selected user", user.id);
                  }}
                >
                  <div className="avatar">
                    {user?.profilePicURL ? (
                      <img
                        src={user?.profilePicURL}
                        style={{
                          width: 32,
                          height: 32,
                          borderRadius: "50%",
                          objectFit: "cover",
                        }}
                      />
                    ) : (
                      <div className="chatHeaderAvatar">
                        <p>
                          {user?.fname?.charAt(0).toUpperCase()}
                          {user?.lname?.charAt(0).toUpperCase()}
                        </p>
                      </div>
                    )}
                    <span
                      className={`status ${user.isOnline ? "online" : "offline"}`}
                    ></span>
                  </div>
                  <li className="miniChatters">
                    {user.fname} {user.lname}
                  </li>
                  <div className="icon">
                    <PersonAddIcon fontSize="small" />
                  </div>
                </div>
              ),
          )}
        {currentUser.id !== 34 &&
          users.map((user: any) => {
            const isOnline = onlineUsers.includes(user.id);
            return (
              user.id !== currentUser.id && (
                <div
                  className="item"
                  key={user.id}
                  onClick={() => {
                    onSelectUser(user);
                    console.log("Selected user", user.id);
                  }}
                >
                  <div className="avatar">
                    {user?.profilePicURL ? (
                      <img
                        src={user?.profilePicURL}
                        style={{
                          width: 32,
                          height: 32,
                          borderRadius: "50%",
                          objectFit: "cover",
                        }}
                      />
                    ) : (
                      <div className="chatHeaderAvatar">
                        <p>
                          {user?.fname?.charAt(0).toUpperCase()}
                          {user?.lname?.charAt(0).toUpperCase()}
                        </p>
                      </div>
                    )}
                    <span
                      className={`status ${isOnline ? "online" : "offline"}`}
                    ></span>
                  </div>
                  <li className="miniChatters">
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
