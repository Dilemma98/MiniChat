import { io } from "socket.io-client";

  const currentUser = JSON.parse(localStorage.getItem("user") || "{}");

export const socket = io("http://localhost:3000", {
    auth: {
        userId: currentUser.id,
    },
    autoConnect: false,
});