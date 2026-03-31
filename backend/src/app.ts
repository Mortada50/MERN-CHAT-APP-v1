import express from 'express';
import path from 'path'
import authRoutes from "./routes/authRoutes"
import chatRoutes from "./routes/chatRoute"
import messageRoutes from "./routes/messageRoutes"
import userRoutes from "./routes/userRoutes"
import { clerkMiddleware } from '@clerk/express'
import { errorHandler } from './middleware/errorHandler';
import cors from "cors"

const app = express();

const allowedOrigins = [
    "http://localhost:8081",
    "http://localhost:5173",
    process.env.FRONTEND_URL!,
].filter(Boolean);

app.use(cors({
    origin: allowedOrigins,
    credentials: true, // allow credentials from client (cookies, authorization headers, etc.)
}))

app.use(express.json()) //parses incoming JSON request bodies and makes them available as req.
//body in your route handlers.

app.use(clerkMiddleware())


app.get("/helth", (req, res) => {
    res.json({status: "Success", message: "Server is running"})
})

app.use("/api/auth", authRoutes)
app.use("/api/chats", chatRoutes)
app.use("/api/messages", messageRoutes)
app.use("/api/users", userRoutes)

// error handlers must come after all the routes and other middlewares so they can catch errors passed with
// next (err) or thrown inside async handlers.
app.use(errorHandler)

// serve frontend in production
if(process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname, "../../web/dist")));

    app.get("/{*any}", (_, res) => {
        res.sendFile(path.join(__dirname, "../../web/dist/index.html"))
    });
}

export default app;