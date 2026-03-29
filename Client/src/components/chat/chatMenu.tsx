import { useEffect, useState } from "react";
import "../../assets/styles/chatPage.css";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import type { ChatMenuProps } from "../../props/chatProp";

export default function ChatMenu({onSelectUser}: ChatMenuProps) {
  const [users, setUsers] = useState([]);
  const currentUser = JSON.parse(localStorage.getItem("user") || "{}");
  async function fetchAllUsers() {
    try {
      const response = await fetch("http://localhost:3000/api/allUsers", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const res = await response.json();
      console.log("USERS", res.users.data);
      const sortedUsers = res.users.data.sort(( a:any, b:any ) => a.fname.localeCompare(b.fname));
      setUsers(sortedUsers);
    } catch {}
  }

  useEffect(() => {
    fetchAllUsers();
  }, []);
  return (
    <div className="chatMenu">
      <h3 className="chatMenuHeader">Minichattare</h3>
      <ul>
        {users.map(
          (user: any) =>
            user.id !== currentUser.id && (
              <div className="item">
                <li key={user.id} onClick={() => {
                  onSelectUser(user)
                  console.log("Selected user", user.id);
                  }}>
                  {user.fname} {user.lname}
                </li>
                <div className="icon">
                  <PersonAddIcon fontSize="small" />
                </div>
              </div>
            ),
        )}
      </ul>
    </div>
  );
}
