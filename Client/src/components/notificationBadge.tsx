import { useNotification } from "../context/notificationContext";
import "../assets/styles/notificationBadge.css";
import type {NotificationProp} from "../props/chatProp";
import MarkChatUnreadOutlinedIcon from '@mui/icons-material/MarkChatUnreadOutlined';

export default function NotificationBadge({notis}: NotificationProp){
    const { notifications } = useNotification();
    console.log("Notifications in badge:", notifications);
    console.log("NOTIS usernam I PROP", notis.userName);

    if(notifications.length === 0) return null;
    return (
        <div className="notificationBadge">
            <MarkChatUnreadOutlinedIcon fontSize="small"/>
            <p>Nytt meddelande från {notis?.userName} </p>
        </div>
    );
}