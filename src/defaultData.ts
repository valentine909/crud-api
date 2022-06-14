import { v4 as uuidv4 } from 'uuid';
import type { IUser } from './model';

export const database: IUser[] = [
  {
    id: uuidv4(),
    username: 'Creator',
    age: 999,
    hobbies: ['typescript'],
  },
  {
    id: uuidv4(),
    username: 'back-ender',
    age: 50,
    hobbies: ['node js'],
  },
];
