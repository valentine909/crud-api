import 'jest';
import { Model } from '../src/model';

describe('Model test', () => {
  const model = new Model();

  const user = {
    id: 'e45e6b20-24e2-4177-b278-adab56e7aa28',
    username: 'Creator',
    age: 999,
    hobbies: ['typescript'],
  };

  const response = {
    user: user,
    index: 0,
  };

  it('getAllUsers', async () => {
    expect(await model.getDatabase()).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          username: expect.any(String),
          age: expect.any(Number),
          id: expect.any(String),
          hobbies: expect.any(Array),
        }),
      ])
    );
  });

  it('getUser true id', async () => {
    expect(
      await model.getUser('e45e6b20-24e2-4177-b278-adab56e7aa28')
    ).toStrictEqual(response);
  });

  it('getUser false id', async () => {
    expect(await model.getUser('1')).toStrictEqual({ user: {}, index: -1 });
  });
});
