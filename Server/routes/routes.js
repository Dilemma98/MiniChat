import { Router } from "express";
import { registerController, loginController } from "../controllers/authController.js";

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
