import { Controller, Get, Route, Tags } from 'tsoa';
import { Inject } from 'typescript-ioc';
import { Health } from './health';
import { HealthService } from './service';

@Route('health')
export class HealthController extends Controller {
  @Inject
  private healthService: HealthService;

  /**
   * Get the health of the service
   */

  @Get()
  @Tags('health')
  public async getHealth(): Promise<Health> {
    return this.healthService.get();
  }
}
