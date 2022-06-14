import 'dotenv/config';
import http from 'http';
import { database } from './defaultData';

const PORT = process.env['PORT'] || 5000;
http
  .createServer((req, res) => {
    if (req) {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(database));
    }
  })
  .listen(PORT);

console.log(`Server is running on port: ${PORT}`);
