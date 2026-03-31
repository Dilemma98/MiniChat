import { io } from "socket.io-client";

  const currentUser = JSON.parse(localStorage.getItem("user") || "{}");

export const socket = io("https://minichat-tymk.onrender.com", {
    auth: {
        userId: currentUser.id,
    },
    autoConnect: false,
});