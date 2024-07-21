
import { Request, Response, NextFunction } from "express";
import { getFormattedResponse } from "../utils/helpers";

/**
 * Logs Request Data
 */
export default  (req: Request, res:Response, next: NextFunction) => {
  try {
    const  { url, method, body, query } = req;

    console.log('======= REQUEST LOGGER START ========');
    console.log('REQUEST URL          >>>>>> ', url);
    console.log('REQUEST METHOD       >>>>>> ', method);
    console.log('REQUEST BODY         >>>>>> ', body);
    console.log('REQUEST QUERY PARAMS >>>>>> ', query);
    console.log('REQUEST TIMESTAMP    >>>>>> ', new Date());
    console.log('======= REQUEST LOGGER END =========', '\n');
    
    return next();
  } catch (error) {
    const errorObj = error as Error;
    const { message } =  errorObj
    return res.status(401).json(getFormattedResponse(false, message, {}));
  }
}