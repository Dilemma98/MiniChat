import { useNotification } from "../context/notificationContext";
import "../assets/styles/notificationBadge.css";

export default function NotificationBadge(){
    const { notifications } = useNotification();
    console.log("Notifications in badge:", notifications);

    if(notifications.length === 0) return null;
    return (
        <div className="notificationBadge">
            <p>Nytt meddelande!</p>
        </div>
    );
}