import 'dotenv/config';
import { router } from "./routes/routes.js";
import { createServer } from 'http';
import { Server } from 'socket.io';
import express from "express";
import cors from "cors";

const app = express();
const port = 3000;

const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*"
  }
});

// When somone connects: get a unique socket
io.on("connection", (socket) => {
  console.log("user connected");

  // When THAT unique socket sends something
  socket.on("send_message", (data) => {
    console.log("message:", data);

    // Send to everyone
    io.emit("receive_message", data);
  });
});

app.use(cors());
app.use(express.json());
app.use('/api', router);

server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});