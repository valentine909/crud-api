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

export enum Endpoit {
  endpoit = '/api/users',
}
export const uuidReg = new RegExp(
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/
);

export enum Messages {
  notFound = 'Record not found',
  serverError = 'Internal Server Error',
  invalidUser = 'Invalid user ID',
  notEnoughData = 'Not enough data',
  deleted = 'User has been deleted successfully',
}
