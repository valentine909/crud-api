import cluster from 'cluster';
import { cpus } from 'os';
import process from 'process';
import { Controller } from './controller';
import { Model } from './model';
import { RESTAPIServer } from './server';

const numCPUs = cpus().length;

if (cluster.isPrimary) {
  console.log(`Primary ${process.pid} is running`);

  for (let i = 0; i < numCPUs; i += 1) {
    cluster.fork();
  }

  Object.keys(cluster.workers!).forEach((id) => {
    cluster.workers![id]?.on('message', (msg) => {
      if (msg.pid) {
        console.log(`Worker ${msg.pid} is processing the request`);
      }
    });
  });

  cluster.on('exit', (worker) => {
    console.log(`worker ${worker.process.pid} died`);
  });
} else {
  const model = new Model();
  const controller = new Controller(model);
  const server = new RESTAPIServer(controller);
  server.init();

  console.log(`Worker ${process.pid} started`);
}
