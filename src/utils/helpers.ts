import { TodoResData } from "./types";

export const getFormattedResponse = (
  status: boolean,
  message: string, 
  data: TodoResData,
) => {
  return {
    status,
    message,
    data,
  };
};

export const getErrorResponse = (message: string, statusCode: number) => {
  return {
    error: true,
    statusCode,
    message,
  };
};