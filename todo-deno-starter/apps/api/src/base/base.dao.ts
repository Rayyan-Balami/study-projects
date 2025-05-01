import Database from '@utils/db.ts';
import { error } from '@utils/logger.ts';
import { parseObject } from '@utils/parseObject.ts';

class BaseDao<T> {
  protected table: string;
  protected db: Database;

  constructor(table: string) {
    this.table = table;
    this.db = Database.getInstance(); // Get the singleton instance
  }

  public async create(item: T): Promise<T> {
    try {
      const { keyString, placeholderString, values } = parseObject(
        item as Record<string, any>,
      );

      const stmt = `INSERT INTO ${this.table} (${keyString}) VALUES (${placeholderString}) RETURNING *`;
      this.db.setStatement(stmt);

      const result = await this.db.getOne<T>(values);
      if (!result) {
        throw new Error(`Failed to create record in ${this.table}`);
      }
      return result;
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : String(err);
      error(`[BaseDao]: Error during create: ${errorMessage}`);
      throw err;
    }
  }

  public async findAll(): Promise<T[]> {
    try {
      const stmt = `SELECT * FROM ${this.table}`;
      this.db.setStatement(stmt);

      return await this.db.getAll<T>([]);
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : String(err);
      error(`[BaseDao]: Error during findAll: ${errorMessage}`);
      throw err;
    }
  }

  public async findById(id: string): Promise<T | null> {
    try {
      const stmt = `SELECT * FROM ${this.table} WHERE id = $1`;
      this.db.setStatement(stmt);

      return await this.db.getOne<T>([id]);
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : String(err);
      error(`[BaseDao]: Error during findById: ${errorMessage}`);
      throw err;
    }
  }

  public async update(id: string, item: Partial<T>): Promise<T> {
    try {
      const { setClauseString, values } = parseObject(
        item as Record<string, any>,
        2,
      );
      const stmt = `UPDATE ${this.table} SET ${setClauseString} WHERE id = $1 RETURNING *`;
      this.db.setStatement(stmt);
      const updatedValues = [id, ...values];
      const result = await this.db.getOne<T>(updatedValues);
      if (!result) {
        throw new Error(`Failed to update record with id ${id}`);
      }
      return result;
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : String(err);
      error(`[BaseDao]: Error during update: ${errorMessage}`);
      throw err;
    }
  }

  public async delete(id: string): Promise<T> {
    try {
      const stmt = `DELETE FROM ${this.table} WHERE id = $1 RETURNING *`;
      this.db.setStatement(stmt);
      
      const result = await this.db.getOne<T>([id]);
      if (!result) {
        throw new Error(`Failed to delete record with id ${id}`);
      }
      return result;
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : String(err);
      error(`[BaseDao]: Error during delete: ${errorMessage}`);
      throw err;
    }
  }

  public async deleteAll(): Promise<number> {
    try {
      const stmt = `DELETE FROM ${this.table} RETURNING id`;
      this.db.setStatement(stmt);
      
      const result = await this.db.getAll<{ id: string }>([]);
      return result.length;
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : String(err);
      error(`[BaseDao]: Error during deleteAll: ${errorMessage}`);
      throw err;
    }
  }
}

export default BaseDao;
