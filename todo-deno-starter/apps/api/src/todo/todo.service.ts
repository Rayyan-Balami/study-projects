import TodoDao from "./todo.dao.ts";
import { todo } from "@api/todo/todo.dto.ts";

interface ITodoService {
  getAll(): Promise<todo[]>;
  getById(id: string): Promise<todo | null>;
  create(newTodo: todo): Promise<todo>;
  update(id: string, todoData: Partial<todo>): Promise<todo>;
  delete(id: string): Promise<todo>;
  deleteAll(): Promise<number>;
}

class TodoService implements ITodoService {
  async getAll(): Promise<todo[]> {
    return await TodoDao.getAllTodos();
  }

  async getById(id: string): Promise<todo | null> {
    return await TodoDao.getTodoById(id);
  }

  async create(newTodo: todo): Promise<todo> {
    return await TodoDao.createTodo(newTodo);
  }

  async update(id: string, todoData: Partial<todo>): Promise<todo> {
    return await TodoDao.updateTodo(id, todoData);
  }

  async delete(id: string): Promise<todo> {
    return await TodoDao.deleteTodo(id);
  }

  async deleteAll(): Promise<number> {
    return await TodoDao.deleteAllTodos();
  }
}

export default new TodoService();