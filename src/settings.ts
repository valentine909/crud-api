export interface IUser {
  id: string;
  username: string;
  age: number;
  hobbies: string[];
}

export type UserPayload = Omit<IUser, 'id'>;

export type SearchResult = {
  user: IUser | {};
  index: number;
};

export const endpoint = '/api/users';

export const Messages = {
  notFound: 'Record not found',
  serverError: 'Internal Server Error',
  invalidUser: 'Invalid user ID',
  notEnoughData: 'Not enough data',
  deleted: 'User has been deleted successfully',
};
