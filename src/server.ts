import http from 'http';
import 'dotenv/config';
import { endpoint } from './settings';
import { isValidId, parseId } from './helper';
import { Controller } from './controller';

export class RESTAPIServer {
  private readonly port: string | number;

  constructor(private controller: Controller) {
    this.controller = controller;
    this.port = process.env['PORT'] || 5000;
  }

  init() {
    http
      .createServer((req, res) => {
        const id: string = parseId(req.url);
        if (
          !req.url?.startsWith(endpoint)
          || req.url.split('/').length > 4
        ) {
          Controller.notFound(res);
        } else if (req.method === 'POST') {
          this.controller.createUser(req, res).then();
        } else if (req.method === 'GET' && (req.url === endpoint || req.url === `${endpoint}/`)) {
          this.controller.getAll(res).then();
        } else if (!isValidId(id)) {
          Controller.invalidUserId(res);
        } else if (req.method === 'GET' && id) {
          this.controller.getUser(res, id).then();
        } else if (req.method === 'PUT' && id) {
          this.controller.updateUser(req, res, id).then();
        } else if (req.method === 'DELETE' && id) {
          this.controller.deleteUser(res, id).then();
        } else {
          Controller.notFound(res);
        }
        if (process.send) {
          process.send({ pid: process.pid });
        }
      })
      .listen(this.port, () => {
        console.log(`[${new Date().toLocaleTimeString()}]: Server is running on port ${this.port}`);
      });
  }
}
