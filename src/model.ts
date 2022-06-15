import { database } from './defaultData';
import type { IUser, SearchResult, UserPayload } from './settings';
import { v4 as uuidv4 } from 'uuid';

export class Model {
  private data: IUser[];
  constructor() {
    this.data = [...database];
  }

  getDatabase(): Promise<IUser[]> {
    return new Promise((resolve) => {
      resolve(this.data);
    });
  }

  getUser(id: string): Promise<SearchResult> {
    return new Promise((resolve) => {
      let i: number = -1;
      const user = this.data.filter((record, index) => {
        if (record.id === id) {
          i = index;
          return true
        } else {
          return false;
        }
      });
      resolve({user: user[0] || {}, index: i});
    });
  }

  createUser(user: UserPayload): Promise<IUser> {
    return new Promise((resolve) => {
      const newUser: IUser = { id: uuidv4(), ...user };
      this.data.push(newUser);
      resolve(newUser);
    });
  }

  deleteUser(id: string): Promise<void> {
    return new Promise((resolve) => {
      this.data = this.data.filter((record) => record.id !== id);
      resolve();
    });
  }

  updateUser(user: UserPayload, id: string): Promise<IUser> {
    return new Promise(async (resolve) => {
      const record = await this.getUser(id);
      const newUser: IUser = { ...record.user as IUser, ...user };
      this.data[record.index] = newUser;
      resolve(newUser);
    });
  }
}
