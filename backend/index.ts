import app from './src/app.ts'
import { connectDB } from "./src/config/database";

const PORT = process?.env?.PORT || 3000;

connectDB().then(() => {
app.listen(PORT, () => {
    console.log(`server start on port: ${PORT}`);
    
})
}).catch((error) => {
    console.error("Failed to start server: ", error);
    process.exit(1);
});
