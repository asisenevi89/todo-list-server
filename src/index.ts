import express from 'express';
import dotenv from 'dotenv';
import todoRoutes from './routes/todoRoutes';
import commonRoutes from './routes';

dotenv.config();

const app = express();
app.use(express.json());

const port = process.env.PORT || 9000;

// Routes
commonRoutes(app);
todoRoutes(app);

app.listen(port, () => {
  console.log(`Listing at http://localhost:${port}`);
});