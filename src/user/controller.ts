/* eslint-disable @typescript-eslint/no-unused-vars */
import { Get, Route, Tags, Controller, Security, Request, Middlewares } from 'tsoa';
import { Inject } from 'typescript-ioc';
import { User } from './user';
import { UserService } from './service';
import { Authenticated } from '../auth';
import cors from 'cors';

@Route('user')
export class UserController extends Controller {
  @Inject
  private userService: UserService;

  /**
   * Gets the user if logged in
   */

  @Get()
  @Tags('user')
  @Security('api_key')
  // @Middlewares(cors()) // RUN CORS ONLY FOR THIS ROUTE
  public async getUser(@Request() request: Authenticated): Promise<User> {
    return request.user;
  }
}
