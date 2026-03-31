import FetchFriends from "../components/friends/friendsMenu";

export default function FriendsPage(){
    return(
      <div style={{ display: "flex", flexDirection: "row", height: "80vh"}}>
            <FetchFriends />
        </div>
    );
}