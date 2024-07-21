import fs from 'fs';
import {
  ToDoDeleteType,
  TodoAddType,
  TodoListType,
  TodoType,
} from '../utils/types';
import { dataSource, encoding, spacing } from '../utils/constants';

const filePath = `${process.cwd()}/${dataSource}`;

/**
 * Returns Todo List based on params
 * 
 * @param count 
 * @param skip 
 * @param search 
 * @returns Object
 */
export const getTodoList = (count: number, skip: number, search: string) => {
  return new Promise<TodoListType>((resolve, reject) => {
    try {
      const jsonData = fs.readFileSync(filePath, encoding).toString();
      const data = JSON.parse(jsonData);
      let searchFilter = data;
      const sliceEnd = skip + count;

      // Filter the items based on search
      if (search) {
        searchFilter = data.filter(
          (item: TodoType) => item.title.toLowerCase().includes(search.toLowerCase()),
        );
      }

      // Get the target filter items
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
};

/**
 * Add new todo item
 * 
 * @param bodyData 
 * @returns Object
 */
export const addTodo = (bodyData: TodoAddType) => {
  return new Promise<TodoType>((resolve, reject) => {
    try {
      const jsonData = fs.readFileSync(filePath, encoding).toString();
      const data = JSON.parse(jsonData);
      
      // Find last item to get id for new todo item
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

/**
 * Update Existing Todo item
 * 
 * @param bodyData 
 * @param id 
 * @returns Object
 */
export const updateTodo = (bodyData: TodoAddType, id: number) => {
  return new Promise<TodoType>((resolve, reject) => {
    try {
      const jsonData = fs.readFileSync(filePath, encoding).toString();
      const data = JSON.parse(jsonData);

      // Find target todo item
      const found = data.find((item: TodoType) => item.id  === id);
      const foundIndex = data.findIndex((item: TodoType) => item.id  === id);

      if (!(found && foundIndex)) {
        reject({
          message: 'Todo not found!',
          statusCode: 404,
        });
      }

      // Updating values
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

/**
 * Remove Todo from the List
 * 
 * @param id 
 * @returns Object
 */
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
};

/**
 * Returns Todo by id
 * 
 * @param id 
 * @returns Object
 */
export const getTodoById = (id: number) => {
  return new Promise<TodoType>((resolve, reject) => {
    try {
      const jsonData = fs.readFileSync(filePath, encoding).toString();
      const data = JSON.parse(jsonData);
      const item = data.find((item: TodoType) => item.id === id);

      if (!item) {
        reject({
          message: 'Todo not found!',
          statusCode: 404,
        });
      }

      resolve(item);
      
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

