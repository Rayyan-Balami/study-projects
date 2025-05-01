import { Pool } from "jsr:@db/postgres";

class Database {
  private static instance: Database;
  private pool: Pool;
  private stmt: string = '';

  private constructor() {
    this.pool = new Pool({
      user: "root",
      password: "1234",
      database: "study",
      hostname: "localhost",
      port: 5432,
    }, 3); // 3 = number of connections in the pool
  }

  public static getInstance(): Database {
    if (!Database.instance) {
      Database.instance = new Database();
    }
    return Database.instance;
  }

  public setStatement(stmt: string): void {
    this.stmt = stmt;
  }

  public async getAll<T>(values: any[]): Promise<T[]> {
    const connection = await this.pool.connect();
    try {
      const result = await connection.queryObject<T>(this.stmt, values);
      return result.rows;
    } catch (error) {
      console.error("Query error:", error);
      throw error;
    } finally {
      connection.release(); // Important: release back to pool
    }
  }

  public async getOne<T>(values: any[]): Promise<T | null> {
    const connection = await this.pool.connect();
    try {
      const result = await connection.queryObject<T>(this.stmt, values);
      return result.rows[0] || null;
    } catch (error) {
      console.error("Query error:", error);
      throw error;
    } finally {
      connection.release();
    }
  }

  public async end() {
    await this.pool.end();
    console.log("Pool ended.");
  }
}

export default Database;
