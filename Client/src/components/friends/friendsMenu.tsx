import { useEffect, useState } from "react";
import "../../assets/styles/friendsPage.css";
import Diversity1Icon from "@mui/icons-material/Diversity1";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

import {
  LIVE_URL,
  // LOCAL_URL
} from "../../url";

export default function FetchMenu() {
  const [fetchedData, setFetchedData] = useState<string>("");

  async function FetchFriendsData() {
    try {
      const response = await fetch(`${LIVE_URL}/api/friends`);
      const res = await response.text();
      console.log("response", res);
      setFetchedData(res);
    } catch {}
  }

  useEffect(() => {
    FetchFriendsData();
  }, []);

  const friends = [
    { id: 1, name: "Lisa Larsson" },
    { id: 2, name: "Anna Johansson" },
    { id: 3, name: "Erik Persson" },
    { id: 4, name: "Maria Andersson" },
    { id: 5, name: "Anders Nilsson" },
  ];

  return (
    <div className="friendsMenu">
      {/* <h2 className="h2">{fetchedData}</h2> */}
      <div style={{ display: "flex", alignItems: "center", gap: "1em" }}>
        <h3 className="friendsMenuHeader">Vänner</h3>
        <span style={{ marginTop: "-1em" }}>
          <Diversity1Icon fontSize="small" />
        </span>
      </div>
      <ul>
        {friends.map((friend) => (
          <div
            style={{ display: "flex", alignItems: "center", gap: "1em" }}
            key={friend.id}
          >
            <div className="avatar">
              <AccountCircleIcon fontSize="medium" />
              <span className="status online"></span>
            </div>
            <li key={friend.id}>{friend.name}</li>
          </div>
        ))}
      </ul>
    </div>
  );
}
