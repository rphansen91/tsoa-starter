import { app } from './app';
import request from 'supertest';
import { Server } from 'net';

describe('App', () => {
  let server: Server;

  beforeAll(function (done) {
    server = app.listen(function (err) {
      if (err) {
        return done(err);
      }
      done();
    });
  });

  afterAll(() => {
    server.close();
  });

  it('Should get health', (done) => {
    request(app)
      .get('/health')
      .set('Content-Type', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, (err, res) => {
        if (err) return done(err);
        expect(res.body.healthy).toBeTruthy();
        // Done
        done();
      });
  });
});
