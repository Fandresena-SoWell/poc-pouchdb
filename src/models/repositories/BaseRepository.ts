import PouchDB from 'pouchdb'
import PouchDBFind from 'pouchdb-find'
PouchDB.plugin(PouchDBFind)

import { v4 as uuidv4 } from 'uuid'
import { ref, Ref } from 'vue'

import { IWrite, IRead } from '../interfaces'

export abstract class BaseRepository<T> implements IWrite<T>, IRead<T> {
  protected dbName: string
  protected _db: PouchDB.Database
  public documents = ref([]) as Ref<PouchDB.Core.Document<T>[]>

  constructor(dbName: string) {
    this.dbName = dbName
    this._db = new PouchDB(dbName)
  }

  async create(item: T): Promise<string | undefined> {
    try {
      const id = uuidv4()
      const result = await this._db.put({
        _id: id,
        ...item,
      })

      const doc = await this._db.get<T>(id)
      this.documents.value.push(doc)

      return result.id
    } catch (err) {
      console.log(err)
    }
  }

  async find(item: Partial<T>): Promise<T[]> {
    try {
      const result = await this._db.find({
        selector: item,
      })
      const docs = result.docs.map((d) => d as unknown as PouchDB.Core.Document<T>)
      this.documents.value = docs
      return docs
    } catch (err) {
      console.log(err)
      return []
    }
  }

  async findOne(id: string): Promise<T | undefined> {
    try {
      const doc = await this._db.get(id)
      return doc as unknown as T
    } catch (err) {
      console.log(err)
    }
  }

  async update(id: string, item: Partial<T>): Promise<boolean> {
    try {
      let doc = await this._db.get<T>(id)
      await this._db.put({
        ...doc,
        ...item,
      })

      doc = await this._db.get<T>(id)
      const index = this.documents.value.findIndex((d) => d._id === doc._id)
      this.documents.value[index] = {
        ...this.documents.value[index],
        ...doc
      }
      return true
    } catch (err) {
      console.log(err)
      return false
    }
  }
  async delete(id: string): Promise<boolean> {
    try {
      const doc = await this._db.get<T>(id)
      await this._db.remove(doc)

      this.documents.value = this.documents.value.filter(d => d._id !== id)

      return true
    } catch (err) {
      console.log(err)
      return false
    }
  }

  async clearDB() {
    await this._db.destroy()
    this._db = new PouchDB(this.dbName)
    this.documents.value = []
  }
}
