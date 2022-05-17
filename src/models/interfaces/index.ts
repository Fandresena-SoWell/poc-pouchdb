export interface IWrite<T> {
  create(item: T): Promise<string | undefined>
  update(id: string, item: T): Promise<boolean>
  delete(id: string): Promise<boolean>
}

export interface IRead<T> {
  find(item: T): Promise<T[]>
  findOne(id: string): Promise<T | undefined>
}

export interface ITodo {
  _id: string
  label: string
  state: 'pending' | 'canceled' | 'done'
}
