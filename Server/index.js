import "dotenv/config";
import { router } from "./routes/routes.js";
import { createServer } from "http";
import { Server } from "socket.io";
import express from "express";
import cors from "cors";
import { sendMessageController } from "./controllers/chatController.js";

const PORT = process.env.PORT || 3000;
const app = express();
const onlineUsers = new Set();

const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173", "https://mini-chat-ruby.vercel.app"],
    methods: ["GET", "POST"],
  },
});

// When somone connects: get a unique socket
io.on("connection", (socket) => {
  // Join the room with the signedin users id.
  const userId = socket.handshake.auth.userId;
  socket.join(userId);
  console.log("user connected");
  console.log("SocketHandshake", socket.handshake.auth);

  // When THAT unique socket sends something
  socket.on("send_message", (data) => {
    console.log("message:", data);

    // Send to specific user
    socket.to(data.receiverId).emit("receive_message", data);
    console.log("message sent to:", data.receiverId);

    sendMessageController(
      data.senderId,
      data.receiverId,
      data.message,
      data.userName,
      data.profilePicURL
    );
  });

  socket.on("typing", ({senderId, receiverId}) => {
    io.to(receiverId).emit("typing", { senderId });
  });

  socket.on("read", ({senderId, receiverId}) => {
    io.to(receiverId).emit("isRead", { senderId });
  });

  if(userId) {
    onlineUsers.add(userId);
    io.emit("online_users", Array.from(onlineUsers));
    console.log("Online users:", Array.from(onlineUsers));
  }
  socket.on("disconnect", () => {
    onlineUsers.delete(userId);
    io.emit("online_users", Array.from(onlineUsers));
  });
});

app.use(cors());
app.use(express.json());
app.use("/api", router);

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
