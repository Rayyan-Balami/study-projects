import todoDao from "./todo.dao.ts";
import { todo } from "@api/todo/todo.dto.ts";

interface ITodoService {
  getTodos(): Promise<todo[]>;
  getTodoById(id: string): Promise<todo | null>;
  createTodo(newTodo: todo): Promise<todo>;
  updateTodo(id: string, todoData: Partial<todo>): Promise<todo>;
  deleteTodo(id: string): Promise<void>;
  deleteAllTodos(): Promise<void>;
}

class TodoService implements ITodoService {
  async getTodos(): Promise<todo[]> {
    return await todoDao.findAll();
  }

  async getTodoById(id: string): Promise<todo | null> {
    return await todoDao.findById(id);
  }

  async createTodo(newTodo: todo): Promise<todo> {
    return await todoDao.create(newTodo);
  }

  async updateTodo(id: string, todoData: Partial<todo>): Promise<todo> {
    return await todoDao.update(id, todoData);
  }

  async deleteTodo(id: string): Promise<void> {
    await todoDao.delete(id);
  }

  async deleteAllTodos(): Promise<void> {
    await todoDao.deleteAll();
  }
}

export default new TodoService();