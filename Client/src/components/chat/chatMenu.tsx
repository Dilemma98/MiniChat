import { useEffect, useState } from "react";
import "../../assets/styles/chatPage.css";

export default function ChatMenu(){
    const [users, setUsers] = useState([]);
    const currentUser = JSON.parse(localStorage.getItem("user") || "{}")
    async function fetchAllUsers(){
        try{
            const response = await fetch("http://localhost:3000/api/allUsers",{
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                },
            });

            const res = await response.json();
            console.log("USERS", res.users.data);
            setUsers(res.users.data);
        } catch{

        }
    }

    useEffect(() => {
        fetchAllUsers();
    },[])
    return(
        <div className="chatMenu">
            <h3 style={{padding: 0, marginTop: 0}}>Användare</h3>
            <ul style={{paddingTop: 0, marginTop: 0}}>
                {users.map((user: any) => (
                    user.id !== currentUser.id && (
                        <li key={user.id}>{user.fname} {user.lname}</li>
                    ) 
                ))}
            </ul>
        </div>
    );
}