import type { IncomingMessage, ServerResponse } from 'http';
import type { Model } from './model';
import { IUser, Messages, UserPayload } from './settings';
import {
  parseRequestBody,
  isValidAge,
  isValidHobbies,
  isValidString,
} from './helper';

export class Controller {
  constructor(private model: Model) {
    this.model = model;
  }

  async createUser(req: IncomingMessage, res: ServerResponse): Promise<void> {
    let user: UserPayload;
    try {
      user = await parseRequestBody(req);
    } catch (error) {
      this.createResponse(res, 500, { message: Messages.serverError });
      return;
    }
    if (
      isValidString(user.username) &&
      isValidAge(user.age) &&
      isValidHobbies(user.hobbies)
    ) {
      let newUser: IUser;
      try {
        newUser = await this.model.createUser(user);
        this.createResponse(res, 201, newUser);
      } catch (error) {
        this.createResponse(res, 500, { message: Messages.serverError });
      }
    } else {
      this.createResponse(res, 400, { message: Messages.notEnoughData });
    }
  }

  async deleteUser(res: ServerResponse, id: string) {
    try {
      await this.model.deleteUser(id);
      this.createResponse(res, 204, { message: Messages.deleted });
    } catch (error) {
      this.createResponse(res, 500, { message: Messages.serverError });
    }
    throw new Error('Method not implemented.');
  }

  async updateUser(req: IncomingMessage, res: ServerResponse, id: string) {
    let user: UserPayload;
    try {
      user = await parseRequestBody(req);
    } catch (error) {
      this.createResponse(res, 500, { message: Messages.serverError });
      return;
    }
    try {
      const updatedUser: IUser = await this.model.updateUser(user, id);
      this.createResponse(res, 200, updatedUser);
    } catch (error) {
      this.createResponse(res, 500, { message: Messages.serverError });
    }
  }

  async getAll(res: ServerResponse): Promise<void> {
    let data: IUser[] = [];
    try {
      data = await this.model.getDatabase();
      this.createResponse(res, 200, data);
    } catch (error) {
      this.createResponse(res, 500, { message: Messages.serverError });
    }
  }

  async getUser(res: ServerResponse, id: string): Promise<void> {
    try {
      const user: IUser | {} = (await this.model.getUser(id)).user;
      this.createResponse(res, 200, user);
    } catch (error) {
      this.createResponse(res, 500, { message: Messages.serverError });
    }
  }

  createResponse(res: ServerResponse, statusCode: number, payload: any): void {
    res.writeHead(statusCode, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(payload));
  }

  notFound(res: ServerResponse): void {
    this.createResponse(res, 404, { message: Messages.notFound });
  }

  invalidUserId(res: ServerResponse): void {
    this.createResponse(res, 400, { message: Messages.invalidUser });
  }
}
