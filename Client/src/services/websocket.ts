import { io } from "socket.io-client";
import { LIVE_URL } from "../url";

  const currentUser = JSON.parse(localStorage.getItem("user") || "{}");

export const socket = io(LIVE_URL, {
    auth: {
        userId: currentUser.id,
    },
    autoConnect: false,
});