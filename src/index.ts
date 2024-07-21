import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import todoRoutes from './routes/todoRoutes';
import commonRoutes from './routes';
import logger from './middleware/logger';

dotenv.config();

const app = express();
app.use(express.json());

// CORS enabling for Frontend access
app.use(cors({
  origin: process.env.FRONT_END_URL
}));

// Middlewares
app.use(logger);

// Routes
commonRoutes(app);
todoRoutes(app);

const port = process.env.PORT || 9000;

app.listen(port, () => {
  console.log(`Listing at http://localhost:${port}`);
});