import { todo } from "@api/todo/todo.dto.ts";
import BaseDao from "../base/base.dao.ts";
import { db } from "@utils/db.ts";

class TodoDao extends BaseDao<todo> {
  
  async create(todo: todo): Promise<todo> {
    const result = await db.queryObject<todo>(
      `INSERT INTO todos (title, description, status) 
       VALUES ($1, $2, $3) 
       RETURNING id, title, description, status`,
      [todo.title, todo.description, todo.status]
    );
    
    return result.rows[0];
  }

  async findById(id: string): Promise<todo | null> {
    const result = await db.queryObject<todo>(
      `SELECT id, title, description, status 
       FROM todos 
       WHERE id = $1`,
      [id]
    );
    
    return result.rows.length > 0 ? result.rows[0] : null;
  }

  async findAll(): Promise<todo[]> {
    const result = await db.queryObject<todo>(
      `SELECT id, title, description, status 
       FROM todos 
       ORDER BY created_at DESC`
    );
    
    return result.rows;
  }

  async update(id: string, updatedTodo: Partial<todo>): Promise<todo> {
    // Build dynamic update query based on provided fields
    const updates: string[] = [];
    const values: any[] = [];
    let paramCount = 1;
    
    if (updatedTodo.title !== undefined) {
      updates.push(`title = $${paramCount}`);
      values.push(updatedTodo.title);
      paramCount++;
    }
    
    if (updatedTodo.description !== undefined) {
      updates.push(`description = $${paramCount}`);
      values.push(updatedTodo.description);
      paramCount++;
    }
    
    if (updatedTodo.status !== undefined) {
      updates.push(`status = $${paramCount}`);
      values.push(updatedTodo.status);
      paramCount++;
    }
    
    if (updates.length === 0) {
      const currentTodo = await this.findById(id);
      if (!currentTodo) {
        throw new Error(`Todo with ID ${id} not found`);
      }
      return currentTodo;
    }
    
    values.push(id); // Add id as the last parameter
    
    const result = await db.queryObject<todo>(
      `UPDATE todos 
       SET ${updates.join(', ')} 
       WHERE id = $${paramCount} 
       RETURNING id, title, description, status`,
      [...values]
    );
    
    if (result.rows.length === 0) {
      throw new Error(`Todo with ID ${id} not found`);
    }
    
    return result.rows[0];
  }

  async delete(id: string): Promise<void> {
    const result = await db.queryObject(
      `DELETE FROM todos WHERE id = $1 RETURNING id`,
      [id]
    );
    
    if (result.rows.length === 0) {
      throw new Error(`Todo with ID ${id} not found`);
    }
  }

  async deleteAll(): Promise<void> {
    await db.queryObject(`DELETE FROM todos`);
  }
}

export default new TodoDao();