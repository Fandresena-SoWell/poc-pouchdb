import { TodoItem } from 'src/models/entities';
import { BaseRepository } from './BaseRepository';

export class TodoRepositorySingletonFactory {
  private static _instance: TodoRepository

  public static Instance(dbName = 'todos') {
    if (!this._instance) {
      this._instance = new TodoRepository(dbName)
    }
    return this._instance
  }

}

export class TodoRepository extends BaseRepository<TodoItem> {
  constructor(dbName: string) {
    super(dbName)
    void this._db.createIndex({
      index: {fields: ['label', 'state']}
    })
  }

}
