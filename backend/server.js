import path from "path";
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import rateLimit from 'express-rate-limit';

dotenv.config();

const app = express();
const port = process.env.PORT || 8000;

app.use(express.json());


app.listen(port, () => {
  connectDB();
  console.log(`Server is connected to PORT: ${port}`);
});
