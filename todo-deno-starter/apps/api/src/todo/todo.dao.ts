import { todo } from '@api/todo/todo.dto.ts';
import BaseDao from '../base/base.dao.ts';

class TodoDao extends BaseDao<todo> {
  constructor() {
    super('todos');
  }

  async createTodo(todo: todo): Promise<todo> {
    try {
      const result = await this.create(todo);
      if (!result) {
        throw new Error(`Failed to create todo`);
      }
      return result;
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      console.error(`[TodoDao]: Error during create: ${errorMessage}`);
      throw error;
    }
  }

  async getAllTodos(): Promise<todo[]> {
    try {
      const result = await this.findAll();
      if (!result) {
        throw new Error(`Failed to fetch todos`);
      }
      return result;
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      console.error(`[TodoDao]: Error during getAll: ${errorMessage}`);
      throw error;
    }
  }

  async getTodoById(id: string): Promise<todo | null> {
    try {
      const result = await this.findById(id);
      if (!result) {
        throw new Error(`Failed to fetch todo with id ${id}`);
      }
      return result;
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      console.error(`[TodoDao]: Error during getById: ${errorMessage}`);
      throw error;
    }
  }

  async updateTodo(id: string, todo: Partial<todo>): Promise<todo> {
    try {
      const result = await this.update(id, todo);
      if (!result) {
        throw new Error(`Failed to update todo with id ${id}`);
      }
      return result;
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      console.error(`[TodoDao]: Error during update: ${errorMessage}`);
      throw error;
    }
  }

  async deleteTodo(id: string): Promise<todo> {
    try {
      const result = await this.delete(id);
      if (!result) {
        throw new Error(`Failed to delete todo with id ${id}`);
      }
      return result;
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      console.error(`[TodoDao]: Error during delete: ${errorMessage}`);
      throw error;
    }
  }

  async deleteAllTodos(): Promise<number> {
    try {
      const result = await this.deleteAll();
      return result;
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      console.error(`[TodoDao]: Error during deleteAll: ${errorMessage}`);
      throw error;
    }
  }
}

export default new TodoDao();
