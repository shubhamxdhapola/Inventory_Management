import express from 'express'
import connectDB from './configs/db.js';
import 'dotenv/config'
import cookieParser from 'cookie-parser';
import errorMiddleware from './middlewares/error.middleware.js';
import productRoutes from './routes/product.routes.js'
import authRoutes from './routes/auth.routes.js'
import { protect } from './middlewares/auth.middleware.js';

const app = express();
const PORT = process.env.PORT

app.use(express.json());
app.use(cookieParser())

app.use("/api/auth", authRoutes);
app.use("/api/products", protect, productRoutes);
app.use(errorMiddleware);

app.use((req, res) => {
    return res.status(404).json({
        message: "Route not found"
    })
})

async function startServer() {
    try {
        await connectDB();
        app.listen(PORT, () => {
            console.log(`Server is running at PORT: ${PORT}`)
        })
    } catch (error) {
        console.error("Failed to start server:", error);
        process.exit(1);
    }
}

startServer();





