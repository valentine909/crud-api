import { Controller } from "./controller";
import { Model } from "./model";
import { RESTAPIServer } from "./server";

const model = new Model();
const controller = new Controller(model)
const server = new RESTAPIServer(controller)
server.init();
