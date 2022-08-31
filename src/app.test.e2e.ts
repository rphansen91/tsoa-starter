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

  it('Should get unathorized', (done) => {
    request(app)
      .get('/user')
      .set('Content-Type', 'application/json')
      .expect('Content-Type', /json/)
      .expect(401, (err, res) => {
        if (err) return done(err);
        expect(res.body.message).toEqual('Unauthorized');
        // Done
        done();
      });
  });

  it('Should get user', (done) => {
    request(app)
      .get('/user')
      .set('Content-Type', 'application/json')
      .set('ACCESS_TOKEN', '123')
      .expect('Content-Type', /json/)
      .expect(200, (err, res) => {
        if (err) return done(err);
        expect(res.body).toEqual({ id: 1, name: 'Ironman' });
        // Done
        done();
      });
  });
});
