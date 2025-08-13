import express from "express";
import dotenv from "dotenv";
import helmet from "helmet";
import cors from "cors";
import { authRoutes } from "./routes/auth/authRoutes";
import { userRoutes } from "./routes/user/userRoutes";
import { productRoutes } from "./routes/product/productRoutes";
import { cartRoutes } from "./routes/cart/cartRoutes";
import { orderRoutes } from "./routes/order/orderRoutes";


dotenv.config();


const app = express();
const PORT = process.env.PORT || 3000;

app.use(helmet());
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);

// Start server
app.listen(PORT, async () => {
    try {
        console.log(`Server is running on port ${PORT}`);
    } catch (error) {
        console.error("Failed to connect to database:");
        process.exit(1);
    }
});