import express from "express";


//import controllers
import { registerUser, loginUser, logoutUser } from "../controllers/user.controllers.js";
const router = express.Router();

router.post('/signup', registerUser);
router.post('/login', loginUser);
router.post('/logout', logoutUser);

export default router;