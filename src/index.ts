import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import todoRoutes from './routes/todoRoutes';
import commonRoutes from './routes';

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors({
  origin: process.env.FRONT_END_URL
}));

const port = process.env.PORT || 9000;

// Routes
commonRoutes(app);
todoRoutes(app);

app.listen(port, () => {
  console.log(`Listing at http://localhost:${port}`);
});