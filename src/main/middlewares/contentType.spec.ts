import request from 'supertest';

import { app } from '../config/app';

describe('ContentType Middleware', () => {
  it('must return default content type as json', async () => {
    app.get('/test_content_type', (req, res) => {
      res.send();
    });

    await request(app).get('/test_content_type').expect('content-type', /json/);
  });

  it('must return another type of content when forced', async () => {
    app.get('/test_content_type_xml', (req, res) => {
      res.type('xml');
      res.send();
    });

    await request(app)
      .get('/test_content_type_xml')
      .expect('content-type', /xml/);
  });
});
