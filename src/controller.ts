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
      Controller.createResponse(res, 500, { message: Messages.serverError });
      return;
    }
    if (
      isValidString(user.username)
      && isValidAge(user.age)
      && isValidHobbies(user.hobbies)
    ) {
      let newUser: IUser;
      try {
        newUser = await this.model.createUser(user);
        Controller.createResponse(res, 201, newUser);
      } catch (error) {
        Controller.createResponse(res, 500, { message: Messages.serverError });
      }
    } else {
      Controller.createResponse(res, 400, { message: Messages.notEnoughData });
    }
  }

  async deleteUser(res: ServerResponse, id: string) {
    try {
      await this.model.deleteUser(id);
      Controller.createResponse(res, 204, { message: Messages.deleted });
    } catch (error) {
      Controller.createResponse(res, 500, { message: Messages.serverError });
    }
    throw new Error('Method not implemented.');
  }

  async updateUser(req: IncomingMessage, res: ServerResponse, id: string) {
    let user: UserPayload;
    try {
      user = await parseRequestBody(req);
    } catch (error) {
      Controller.createResponse(res, 500, { message: Messages.serverError });
      return;
    }
    try {
      const updatedUser: IUser = await this.model.updateUser(user, id);
      Controller.createResponse(res, 200, updatedUser);
    } catch (error) {
      Controller.createResponse(res, 500, { message: Messages.serverError });
    }
  }

  async getAll(res: ServerResponse): Promise<void> {
    let data: IUser[] = [];
    try {
      data = await this.model.getDatabase();
      Controller.createResponse(res, 200, data);
    } catch (error) {
      Controller.createResponse(res, 500, { message: Messages.serverError });
    }
  }

  async getUser(res: ServerResponse, id: string): Promise<void> {
    try {
      const { user } = await this.model.getUser(id);
      Controller.createResponse(res, 200, user);
    } catch (error) {
      Controller.createResponse(res, 500, { message: Messages.serverError });
    }
  }

  static createResponse(res: ServerResponse, statusCode: number, payload: any): void {
    res.writeHead(statusCode, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(payload));
  }

  static notFound(res: ServerResponse): void {
    Controller.createResponse(res, 404, { message: Messages.notFound });
  }

  static invalidUserId(res: ServerResponse): void {
    Controller.createResponse(res, 400, { message: Messages.invalidUser });
  }
}
