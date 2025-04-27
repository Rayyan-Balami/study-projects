abstract class BaseDao<T> {
  abstract create(item: T): Promise<T>;
  abstract findById(id: string): Promise<T | null>;
  abstract findAll(): Promise<T[]>;
  abstract update(id: string, item: T): Promise<T>;
  abstract delete(id: string): Promise<void>;
  abstract deleteAll(): Promise<void>;
}

export default BaseDao;