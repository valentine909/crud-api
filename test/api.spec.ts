import 'jest';
import type { IncomingMessage } from 'http';

const request = require('supertest');

describe('API test', () => {
  const req = request('http://localhost:5000');
  const user = {
    id: 'e45e6b20-24e2-4177-b278-adab56e7aa28',
    username: 'Creator',
    age: 999,
    hobbies: ['typescript']
  };

  it('user info should be received', async () => {
    await req
      .get('/api/users/e45e6b20-24e2-4177-b278-adab56e7aa28')
      .expect(200)
      .expect('Content-Type', /json/)
      .then((response: { body: IncomingMessage; }) => {
        expect(response.body).toMatchObject(user);
      })
      .catch();
  });
});
