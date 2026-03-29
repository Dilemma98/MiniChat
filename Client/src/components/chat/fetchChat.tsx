import { useEffect, useState } from "react";
import "../../assets/styles/chosenpage.css";
import ShowChat from "./showChat";
import type { Message } from "../../types/chat";
import { socket } from "../../services/websocket";
import type { FetchChatProps } from "../../props/chatProp";

export default function FetchChat({ senderId, receiverId}: FetchChatProps) {
const [fetchedMessages, setFetchedMessages] = useState<Message[]>([]);

async function fetchChatById(){
    console.log("Fetching chat", senderId, receiverId)
    console.log("receiver", receiverId);
  try{
    const response = await fetch(`http://localhost:3000/api/getConvoById/${senderId.id}/${receiverId.id}`,{
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    });

    const res = await response.json();
    console.log("Messages", res);
  } catch{

  }
}

useEffect(() => {
 if(receiverId) {
    fetchChatById();
  }
}, [receiverId]);

  return ( <ShowChat chosenUserId={receiverId} currentUserId={senderId} messages={fetchedMessages}/>);
}
