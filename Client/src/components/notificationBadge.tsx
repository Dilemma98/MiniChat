import { useNotification } from "../context/notificationContext";
import "../assets/styles/notificationBadge.css";
import type { NotificationProp } from "../props/chatProp";

export default function NotificationBadge({ notis }: NotificationProp) {
  const { notifications } = useNotification();
  const initials = notis?.userName?.charAt(0).toUpperCase() ?? "?";

  if (notifications.length === 0) return null;
  return (
    <div className="notificationBadge">
      <div className="notificationBadge-avatar">{initials}</div>
      <div className="notificationBadge-text">
        <span className="notificationBadge-name">{notis.userName}</span>
        <span className="notificationBadge-msg">Nytt meddelande</span>
      </div>
    </div>
  );
}
