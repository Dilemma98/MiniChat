import { useEffect, useState } from "react";
import "../../assets/styles/chosenpage.css";

export default function FetchFriends() {
  const [fetchedData, setFetchedData] = useState<string>("");

  async function FetchFriendsData() {
    try {
      const response = await fetch("http://localhost:3000/api/friends");
      const res = await response.text();
      console.log("response", res);
      setFetchedData(res);
    } catch {}
  }

  useEffect(() => {
    FetchFriendsData();
  }, []);

  return (
    <div className="chosenPage">
      <h2 className="h2">{fetchedData}</h2>
    </div>
  );
}
