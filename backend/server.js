import dotenv from "dotenv";
import express from "express";
import authRoutes from "./routes/authRoutes.js";
import messagesRoutes from "./routes/messageRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import connectDb from "./db/connection.js";
import cookieParser from "cookie-parser";
import { app, io, server } from "./socket/socket.js";
import path from "path";
const port = process.env.PORT || 3000;
const __dirname = path.resolve();

dotenv.config();
app.use(express.json());
app.use(cookieParser());

// app.get('/',(req,res)=>{
//     res.send("server running !!")
// })
app.use("/api/auth", authRoutes);
app.use("/api/messages", messagesRoutes);
app.use("/api/users", userRoutes);
app.use(express.static(path.join(__dirname, "/frontend/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
});

server.listen(port, () => {
  connectDb();
  console.log(`server running on port http://localhost:${port}`);
});
