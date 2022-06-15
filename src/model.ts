import { v4 as uuidv4 } from 'uuid';
import { database } from './defaultData';
import type { IUser, SearchResult, UserPayload } from './settings';
import { isValidAge, isValidHobbies, isValidString } from './helper';

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
          return true;
        }
        return false;
      });
      resolve({ user: user[0] || {}, index: i });
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

  async updateUser(user: UserPayload, id: string): Promise<IUser> {
    const record = await this.getUser(id);
    return new Promise((resolve, reject) => {
      if (record.index >= 0) {
        if (isValidString(user.username) && 'username' in record.user) {
          record.user.username = user.username;
        }
        if (isValidAge(user.age) && 'age' in record.user) {
          record.user.age = user.age;
        }
        if (isValidHobbies(user.hobbies) && 'hobbies' in record.user) {
          record.user.hobbies = user.hobbies;
        }
        this.data[record.index] = <IUser>record.user;
      } else {
        reject();
      }
      resolve(this.data[record.index] as IUser);
    });
  }
}
