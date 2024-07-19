import { Request, Response, Application } from "express";
import { getFormattedResponse } from "../utils/helpers";
import { PromiseErrorType } from "../utils/types";
import { addTodo, deleteTodo, getTodoList, updateTodo } from "../modules/todoModule";

const TodoRoutes = (app: Application) => {
  app.get('/to-do', async(req: Request, res: Response) => {
    try {
      const { count, skip, search } = req.query;
      const pageSize = count ? parseInt(count.toString()) : 10
      const offset = skip ? parseInt(skip.toString()) : 0;
      const searchString = search ? search.toString() : '';

      const result = await getTodoList(pageSize, offset, searchString);
      const response = getFormattedResponse(true, 'Todo List Data', result)
      res.status(200).json(response);
    } catch (error) {
      const errorObj = error as PromiseErrorType;
      const { statusCode, message } = errorObj;
      
      res.status(statusCode).json(getFormattedResponse(false, message, []));
    }
  });

  app.post('/to-do', async(req: Request, res: Response) => {
    try {
      const requestBody  = req.body;
      
      const result = await addTodo(requestBody);
      const response = getFormattedResponse(true, 'Todo Item Created', result);
      res.status(200).json(response);
    } catch (error) {
      const errorObj = error as PromiseErrorType;
      const { statusCode, message } = errorObj;
      
      res.status(statusCode).json(getFormattedResponse(false, message, []));
    }
  });

  app.put('/to-do/:id', async(req: Request, res: Response) => {
    try {
      const requestBody  = req.body;
      const { id } = req.params;
      const updateId = id ? parseInt(id) : 0
      
      const result = await updateTodo(requestBody, updateId);
      const response = getFormattedResponse(true, 'Todo Item Updated', result);
      res.status(200).json(response);
    } catch (error) {
      const errorObj = error as PromiseErrorType;
      const { statusCode, message } = errorObj;
      
      res.status(statusCode).json(getFormattedResponse(false, message, []));
    }
  });

  app.delete('/to-do/:id', async(req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const deleteId = id ? parseInt(id) : 0
      
      const result = await deleteTodo(deleteId);
      const response = getFormattedResponse(true, 'Todo Item Deleted', result);
      res.status(200).json(response);
    } catch (error) {
      const errorObj = error as PromiseErrorType;
      const { statusCode, message } = errorObj;
      
      res.status(statusCode).json(getFormattedResponse(false, message, []));
    }
  });
};

export default TodoRoutes;  
