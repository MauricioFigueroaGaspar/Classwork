import express from 'express';
import authRoutes from './routes/authRoutes.js';
import apiRoutes from './routes/apiRoutes.js';
import { errorMiddleware } from './middleware/errorMiddleware.js';
import { protect, requireAdmin } from './middleware/authMiddleware.js';
import { AppError } from './utils/appError.js';
import { loadEnvFile } from "node:process";
import { connectDB } from "./config/db.js";
loadEnvFile(); // Loads the default .env in the current working directory

const dbUser = process.env.DB_USER;
const dbPass = process.env.DB_PASSWORD;
const dbName = "FirstDB";

const app = express();
const PORT = 3000;

const mongoUrl = `mongodb+srv://${dbUser}:${dbPass}@cluster0.p5wxtpe.mongodb.net/${dbName}`;
connectDB(mongoUrl);

// Body parser
app.use(express.json());
// TODO: Serve static files from the 'public' directory so index.html loads on http://localhost:3000
app.use(express.static('public'));

// TODO: Mount Routers
// Mount authRoutes on '/api/auth'
app.use("/api/auth", requireAdmin, authRoutes);
// Mount apiRoutes on '/api/'
app.use("/api", protect, apiRoutes);

app.post('/user', (req, res) => {
    const { username, name, email, password } = req.body;
    if (!username || !email || !password)
        return res.status(400).json({ message: "All fields are required" });
    createUser({ username, name, email, password })
        .then((user) => res.json(user))
        .catch((err) => next(user));


});

// 404 Unhandled Route Handler
app.all("/{*splat}", (req, res, next) => {
    next(new AppError(`Cannot find route ${req.originalUrl} on this server!`, 404));
});

// Centralized Global Error Handler
app.use(errorMiddleware);

app.listen(PORT, () => {
    console.log(`🚀 SustainHub Server running at http://localhost:${PORT}`);
});
