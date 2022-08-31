import { Get, Route, Tags, Controller } from 'tsoa';
import { Inject } from 'typescript-ioc';
import { Health } from './health';
import { HealthService } from './service';

@Route('health')
export class HealthController extends Controller {
  @Inject
  private healthService: HealthService;

  @Get()
  @Tags('health')
  public async getHealth(): Promise<Health> {
    return this.healthService.get();
  }
}
