import { Router } from "express";
import { registerController, loginController } from "../controllers/authController.js";
import { getAllUsersController, upload, uploadProfilePicController } from "../controllers/userController.js";
import { getConvoByIdController} from "../controllers/chatController.js";

export const router = Router();

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

router.post("/uploadProfilePic", upload.single("profilePic"), uploadProfilePicController);
// router.post("/sendMessage/:senderId/:receiverId", sendMessageController);