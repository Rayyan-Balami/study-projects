import { todo } from "@api/todo/todo.dto.ts";
import BaseDao from "../base/base.dao.ts";

class TodoDao extends BaseDao<todo> {
  private todos: todo[] = [];

  async create(todo: todo): Promise<todo> {
    this.todos.unshift(todo);
    return todo;
  }

  async findById(id: string): Promise<todo | null> {
    const foundTodo = this.todos.find((t) => t.id === id);
    return foundTodo || null;
  }

  async findAll(): Promise<todo[]> {
    return this.todos;
  }

  async update(id: string, updatedTodo: Partial<todo>): Promise<todo> {
    const index = this.todos.findIndex((t) => t.id === id);
    if (index === -1) {
      throw new Error(`Todo with ID ${id} not found`);
    }
    
    this.todos[index] = { ...this.todos[index], ...updatedTodo };
    return this.todos[index];
  }

  async delete(id: string): Promise<void> {
    const index = this.todos.findIndex((t) => t.id === id);
    if (index === -1) {
      throw new Error(`Todo with ID ${id} not found`);
    }
    
    this.todos.splice(index, 1);
  }

  async deleteAll(): Promise<void> {
    this.todos = [];
  }
}

export default new TodoDao();