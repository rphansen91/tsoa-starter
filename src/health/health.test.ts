import { Container } from 'typescript-ioc';
import { HealthService } from './service';

describe('Health', () => {
  it('Should get health', async () => {
    const svc = Container.get(HealthService);
    const res = await svc.get();
    expect(res.healthy).toBeTruthy();
  });
});
