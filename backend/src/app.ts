import express from 'express';
import authRoutes from "./routes/authRoutes"
import chatRoutes from "./routes/chatRoute"
import messageRoutes from "./routes/messageRoutes"
import userRoutes from "./routes/userRoutes"

const app = express();
app.use(express.json()) //parses incoming JSON request bodies and makes them available as req.
//body in your route handlers.

app.get("/helth", (req, res) => {
    res.json({status: "Success", message: "Server is running"})
})

app.use("/api/auth", authRoutes)
app.use("/api/chats", chatRoutes)
app.use("/api/messages", messageRoutes)
app.use("/api/users", userRoutes)

export default app;