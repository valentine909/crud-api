import type { Controller } from './controller';
import 'dotenv/config';
import http from 'http';
import { Endpoit, uuidReg } from './settings';
import { parseId } from './helper';

export class RESTAPIServer {
  private _port: string | number;
  constructor(private controller: Controller) {
    this.controller = controller;
    this._port = process.env['PORT'] || 5000;
  }

  init() {
    http
      .createServer((req, res) => {
        const id: string = parseId(req.url);
        if (
          !req.url?.startsWith(Endpoit.endpoit) ||
          req.url.split('/').length > 4
        ) {
          this.controller.notFound(res);
        } else if (req.method === 'POST') {
          this.controller.createUser(req, res);
        } else if (req.method === 'GET' && req.url === Endpoit.endpoit) {
          this.controller.getAll(res);
        } else if (!id.match(uuidReg)) {
          this.controller.invalidUserId(res);
        } else if (req.method === 'GET' && id) {
          this.controller.getUser(res, id);
        } else if (req.method === 'PUT' && id) {
          this.controller.updateUser(req, res, id);
        } else if (req.method === 'DELETE' && id) {
          this.controller.deleteUser(res, id);
        } else {
          this.controller.notFound(res);
        }
      })
      .listen(this._port, () => {
        console.log(`Server is running on port ${this._port}`);
      });
  }

  get port() {
    return this._port;
  }
}
