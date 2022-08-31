import { Request } from 'express';
import { cleanEnv, str } from 'envalid';
import { UnauthorizedError } from './errors';
import { UserService } from './user/service';
import { Container } from 'typescript-ioc';

const env = cleanEnv(process.env, {
  ACCESS_TOKEN: str({ default: 'access_token' }),
});

export interface User {
  id: number;
  name: string;
}

export type Authenticated = Request & { user: User };

export async function expressAuthentication(request: Request, securityName: string, _scopes?: string[]) {
  if (securityName === 'api_key') {
    const service = Container.get(UserService);
    const [token] = request.header(env.ACCESS_TOKEN) || [];
    const user = await service.loadFromToken(token);
    if (user) return user;
  }

  throw new UnauthorizedError();
}
