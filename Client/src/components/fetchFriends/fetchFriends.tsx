import { useEffect, useState } from "react";
import "../../assets/styles/chosenpage.css";
import { LIVE_URL, 
  // LOCAL_URL
} from "../../url";

export default function FetchFriends() {
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

  return (
    <div className="chosenPage">
      <h2 className="h2">{fetchedData}</h2>
    </div>
  );
}
