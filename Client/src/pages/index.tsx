import { useState, useEffect } from "react";
import Header from "../components/header";
import SignedIn from "./signedInPage";
import AuthModal from "../components/auth/authModal";
import { socket } from "../services/websocket";
import { useNotification } from "../context/notificationContext";
import NotificationBadge from "../components/notificationBadge.tsx";

export default function StartPage() {
  const [user, setUser] = useState(null);
  const [modalType, setModalType] = useState<"login" | "register" | null>(null);
  const { addNotification } = useNotification();
  const [notifications, setNotifications] = useState<{
    senderId: number;
    userName: string;
  } | null>(null);
  const [showNotif, setShowNotif] = useState(false);

  useEffect(() => {
    if (notifications) {
      setShowNotif(true);
      const timer = setTimeout(() => setShowNotif(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [notifications]);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  useEffect(() => {
    const handleMessage = (data: any) => {
      console.log("NOTIS NYTT MEDDELANDE:", data);
      addNotification(data);
      setNotifications(data);
    };

    socket.on("receive_message", handleMessage);

    return () => {
      socket.off("receive_message", handleMessage);
    };
  }, [addNotification]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        margin: "0 auto",
        height: "100vh",
      }}
    >
      <Header
        user={user}
        onOpenModal={(type) => setModalType(type)}
        onLogout={() => setUser(null)}
      />
      {user && (
        <div>
          <SignedIn user={user} />
          {showNotif && notifications && (
            <NotificationBadge notis={notifications} />
          )}
        </div>
      )}
      {modalType && (
        <AuthModal
          modalType={modalType}
          onClose={() => setModalType(null)}
          onLogin={(user) => setUser(user)}
        />
      )}
    </div>
  );
}
