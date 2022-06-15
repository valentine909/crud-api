import type { IncomingMessage } from 'http';
import { validate as uuidValidate, version as uuidVersion } from 'uuid';
import type { UserPayload } from './settings';

export const parseId = (endpoint: string | undefined): string => {
  const args = endpoint ? endpoint.split('/') : [];
  if (args.length === 4) {
    return args[3]!;
  }
  return '';
};

export const isValidString = (someString: string): boolean => typeof someString === 'string';

export const isValidAge = (age: number): boolean => typeof age === 'number';

export const isValidHobbies = (
  hobbies: string[],
): boolean => hobbies.length > 0 && hobbies.every((hobby) => isValidString(hobby));

export const parseRequestBody = (
  req: IncomingMessage,
): Promise<UserPayload> => new Promise((resolve) => {
  try {
    let body = '';
    req.on('data', (chunk) => {
      body += chunk.toString();
    });
    req.on('end', async () => {
      resolve(JSON.parse(body) as UserPayload);
    });
  } catch (error) {
    throw new Error();
  }
});

export const isValidId = (id: string) => uuidValidate(id) && uuidVersion(id) === 4;
