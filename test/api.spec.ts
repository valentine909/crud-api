import 'jest';
import type { IncomingMessage } from 'http';

const request = require('supertest');

describe('API test', () => {
  const req = request('http://localhost:5000');
  const user = {
    id: 'e45e6b20-24e2-4177-b278-adab56e7aa28',
    username: 'Creator',
    age: 999,
    hobbies: ['typescript'],
  };

  const newUser = {
    username: 'Noobie',
    age: 3,
    hobbies: ['watch TV'],
  };

  it('user info should be received', async () => {
    await req
      .get('/api/users/e45e6b20-24e2-4177-b278-adab56e7aa28')
      .expect(200)
      .expect('Content-Type', /json/)
      .then((response: { body: IncomingMessage }) => {
        expect(response.body).toMatchObject(user);
      })
      .catch((err: any) => console.log(err));
  });

  it('created user info should be received back', async () => {
    await req
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /json/)
      .then((response: { body: IncomingMessage }) => {
        expect(response.body).toMatchObject(newUser);
      })
      .catch((err: any) => console.log(err));
  });

  it('all users info should be received', async () => {
    await req
      .get('/api/users')
      .expect(200)
      .expect('Content-Type', /json/)
      .then((response: { body: IncomingMessage }) => {
        expect(response.body).toEqual(
          expect.arrayContaining([
            expect.objectContaining({
              username: expect.any(String),
              age: expect.any(Number),
              id: expect.any(String),
              hobbies: expect.any(Array),
            }),
          ])
        );
      })
      .catch((err: any) => console.log(err));
  });
});
