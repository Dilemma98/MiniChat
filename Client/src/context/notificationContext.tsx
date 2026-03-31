import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";

type NotificationContextType = {
  notifications: any[];
  addNotification: (notification: any) => void;
};

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export function NotificationProvider({ children}: { children: ReactNode}) {
    const [notifications, setNotifications] = useState<any[]>([]);

    const addNotification = (data: any) => {
        setNotifications((prev) => [...prev, data]);
    }

    return (
        <NotificationContext.Provider value={{ notifications, addNotification }}>
            {children}
        </NotificationContext.Provider>
    );
}
export function useNotification() {
    const context = useContext(NotificationContext);
    if (!context) {
        throw new Error("useNotification must be used within a NotificationProvider");
    }
    return context;
}