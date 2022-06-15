import type { IncomingMessage } from 'http';
import type { UserPayload } from './settings';

export const parseId = (endpoint: string | undefined): string => {
  const args = endpoint ? endpoint.split('/') : [];
  if (args.length === 4) {
    return args[3]!;
  }
  return '';
};

export const isValidString = (someString: string): boolean => {
  return typeof someString === 'string';
};

export const isValidAge = (age: number): boolean => {
  return typeof age === 'number';
};

export const isValidHobbies = (hobbies: string[]): boolean => {
  return hobbies.length > 0 && hobbies.every((hobby) => isValidString(hobby));
};

export const parseRequestBody = (
  req: IncomingMessage
): Promise<UserPayload> => {
  return new Promise((resolve) => {
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
};
