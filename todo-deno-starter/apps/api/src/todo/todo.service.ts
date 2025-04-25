import todoDao from "./todo.dao.ts";
import { todo } from "@api/todo/todo.dto.ts";

const getTodos = async (): Promise<todo[]> => {
  return await todoDao.getAll();
};

const getTodoById = async (id: string): Promise<todo> => {
  return await todoDao.getById(id);
};

const createTodo = async (newTodo: todo): Promise<todo> => {
  return await todoDao.create(newTodo);
};

const updateTodo = async (id: string, todoData: Partial<todo>): Promise<todo> => {
  return await todoDao.update(id, todoData);
};

const deleteTodo = async (id: string): Promise<todo> => {
  return await todoDao.detele(id);
};

export default {
  getTodos,
  getTodoById,
  createTodo,
  updateTodo,
  deleteTodo
};