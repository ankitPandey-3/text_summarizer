import express from "express";

//import controllers
import {
  registerUser,
  loginUser,
  logoutUser,
  changeCurrentPassword,
  refreshAccessToken,
  validateToken,
} from "../controllers/user.controllers.js";
const router = express.Router();

router.post("/signup", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.post("/change-password", changeCurrentPassword);
router.post("/refresh-token", refreshAccessToken);
router.post("/validate-token", validateToken);

export default router;
