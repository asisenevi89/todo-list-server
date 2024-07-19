import fs from 'fs';
import {
  ToDoDeleteType,
  TodoAddType,
  TodoListType,
  TodoType,
} from '../utils/types';
import { dataSource, encoding, spacing } from '../utils/constants';

const filePath = `${process.cwd()}/${dataSource}`;

export const getTodoList = (count: number, skip: number, search: string) => {
  return new Promise<TodoListType>((resolve, reject) => {
    try {
      const jsonData = fs.readFileSync(filePath, encoding).toString();
      const data = JSON.parse(jsonData);
      let searchFilter = data;
      const sliceEnd = skip + count;

      if (search) {
        searchFilter = data.filter(
          (item: TodoType) => item.title.toLowerCase().includes(search.toLowerCase()),
        );
      }

      const sliceData = searchFilter.slice(skip, sliceEnd);

      resolve({
        total: searchFilter.length,
        data: sliceData,
      });
      
    } catch (error) {
      let reason = '';

      if (error instanceof Error) {
        reason = error.message;
      }

      reject({
        message: `Error in reading data due to ${reason}`,
        statusCode: 500,
      });
    }
  });
}

export const addTodo = (bodyData: TodoAddType) => {
  return new Promise<TodoType>((resolve, reject) => {
    try {
      const jsonData = fs.readFileSync(filePath, encoding).toString();
      const data = JSON.parse(jsonData);
    
      const lastItem = data[data.length-1];
      const { id: lastId } = lastItem;

      const insertData = {
        id: lastId + 1,
        ...bodyData
      };

      const updated = [ ...data, insertData];
      fs.writeFileSync(filePath, JSON.stringify(updated, null, spacing), encoding);

      resolve(insertData);
      
    } catch (error) {
      let reason = '';

      if (error instanceof Error) {
        reason = error.message;
      }

      reject({
        message: `Error in writing data due to ${reason}`,
        statusCode: 500,
      });
    }
  });
};


export const updateTodo = (bodyData: TodoAddType, id: number) => {
  return new Promise<TodoType>((resolve, reject) => {
    try {
      const jsonData = fs.readFileSync(filePath, encoding).toString();
      const data = JSON.parse(jsonData);

      const found = data.find((item: TodoType) => item.id  === id);
      const foundIndex = data.findIndex((item: TodoType) => item.id  === id);

      if (!(found && foundIndex)) {
        reject({
          message: 'Document not found!',
          statusCode: 404,
        });
      }
      const updateItem = {
        id,
        ...bodyData,
      };

      data[foundIndex] = updateItem

      const updated = [...data];
      fs.writeFileSync(filePath, JSON.stringify(updated, null, spacing), encoding);

      resolve(updateItem);
      
    } catch (error) {
      let reason = '';

      if (error instanceof Error) {
        reason = error.message;
      }

      reject({
        message: `Error in writing data due to ${reason}`,
        statusCode: 500,
      });
    }
  });
};


export const deleteTodo = (id: number) => {
  return new Promise<ToDoDeleteType>((resolve, reject) => {
    try {
      const jsonData = fs.readFileSync(filePath, encoding).toString();
      const data = JSON.parse(jsonData);
      const filteredList = data.filter((item: TodoType) => item.id !== id);

      fs.writeFileSync(filePath, JSON.stringify(filteredList, null, spacing), encoding);

      resolve({
        deletedId: id
      });
      
    } catch (error) {
      let reason = '';

      if (error instanceof Error) {
        reason = error.message;
      }

      reject({
        message: `Error in writing data due to ${reason}`,
        statusCode: 500,
      });
    }
  });
}