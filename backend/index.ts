import app from './src/app.ts'
import { connectDB } from "./src/config/database";
import {createServer} from "http"
import { initializeSocket } from './src/utils/socket.ts';


const PORT = process?.env?.PORT || 3000;

const httpServer = createServer(app)

initializeSocket(httpServer);

connectDB().then(() => {
httpServer.listen(PORT, () => {
    console.log(`server start on port: ${PORT}`);
    
})
}).catch((error) => {
    console.error("Failed to start server: ", error);
    process.exit(1);
});
