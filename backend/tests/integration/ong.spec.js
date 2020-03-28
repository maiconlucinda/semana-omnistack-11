const request = require('supertest');
const app = require('../../src/app');
const connection = require('../../src/database/connection');

describe('ONG', () => {
  beforeEach( async () => {
    await connection.migrate.rollback();
    await connection.migrate.latest();
  });

  afterAll(async () => {
    await connection.destroy();
  });

  it('Show be able to create a new ONG', async () => {
    const respose = await request(app)
    .post('/ongs')
    .send({
      name: "ASCA",
      email: "contato@gmail.com",
      whatsapp: "7336052480",
      city: "Mucuri",
      uf: "BA"
    });

    expect(respose.body).toHaveProperty('id');
    expect(respose.body.id).toHaveLength(8)
  });


});