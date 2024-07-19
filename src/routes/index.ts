import { Request, Response, Application } from "express";

const CommonRoutes = (app: Application) => {
  app.get('/', (req: Request, res: Response) => {
    res.send('Home Route');
  });
};

export default CommonRoutes;  
