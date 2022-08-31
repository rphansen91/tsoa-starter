import { Get, Route, Tags, Controller, Security, Request } from 'tsoa';
import { Inject } from 'typescript-ioc';
import { User } from './user';
import { UserService } from './service';
import { Authenticated } from '../auth';

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
  public async getUser(@Request() request: Authenticated): Promise<User> {
    return request.user;
  }
}
