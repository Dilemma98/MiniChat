import "dotenv/config";
import { router } from "./routes/routes.js";
import { createServer } from "http";
import { Server } from "socket.io";
import express from "express";
import cors from "cors";
import { sendMessageController } from "./controllers/chatController.js";

const app = express();
const port = 3000;

const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

// When somone connects: get a unique socket
io.on("connection", (socket) => {
  // Join the room with the signedin users id.
  socket.join(socket.handshake.auth.userId);
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
    );
  });
});

app.use(cors());
app.use(express.json());
app.use("/api", router);

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
