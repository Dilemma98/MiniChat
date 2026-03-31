import { Router } from "express";
import { registerController, loginController } from "../controllers/authController.js";
import { getAllUsersController } from "../controllers/userController.js";
import { getConvoByIdController, sendMessageController } from "../controllers/chatController.js";

export const router = Router();

router.get("/test", (req, res) => {
  res.send("Svar från testroutern");
});

router.get("/conversations", (req, res) => {
  const conversationes = [
    { userId: 1, message: "Hej!", userName: "Emma" },
    { userId: 2, message: "Tjena, läget?", userName: "Anna" },
  ];
  res.json(conversationes);
});

router.get("/friends", (req, res) => {
  res.send("Nu är du inne i vänner");
});

router.get("/settings", (req, res) => {
  res.send("Nu är du inne i inställningar");
});

router.post("/register", registerController);

router.post("/login", loginController);

router.get("/allUsers", getAllUsersController);

router.get("/getConvoById/:senderId/:receiverId", getConvoByIdController);

router.post("/sendMessage/:senderId/:receiverId", sendMessageController);