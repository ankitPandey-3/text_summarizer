import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken"
export const checkAuth = async (req, res, next) => {
    const tokens = req.cookies?.accessToken;
    // const tokens = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "")
    if(!tokens){
        return next();
    }
    const decodedToken = jwt.verify(tokens, process.env.ACCESS_TOKEN_SECRET);
    const user = await User.findById(decodedToken?._id).select("-password -refreshToken");
    if(!user){
        return next();
    }
    req.user = user;
    next();
}