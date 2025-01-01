import path from "path";
import express from "express";
import dotenv from "dotenv";
import userRoutes from "./routes/user.routes.js";
import connectDB from "./db/config.js";
import cors from "cors";
import rateLimit from 'express-rate-limit';

dotenv.config();

const app = express();
const port = process.env.PORT || 8000;

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100
});

app.use(limiter);
app.use(cors({
  origin: ['http://localhost:5173', 'https://github-users-chi-one.vercel.app']
}));
app.use(express.json());

const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, "/frontend/dist")));
app.use("/api/users", userRoutes);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
});

app.listen(port, () => {
  connectDB();
  console.log(`Server is connected to PORT: ${port}`);
});
