import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";


const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}));

app.use(express.json({limit: "25kb"}));
app.use(express.urlencoded({extended:true}));
app.use(express.static("public"));
app.use(cookieParser());

//route import
import AUTHROUTER from './routes/user.route.js';

app.use('/api/v1/auth',AUTHROUTER);

export { app };