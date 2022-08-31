import { Health } from './health';

export class HealthService {
  public get(): Health {
    return {
      healthy: true,
    };
  }
}
