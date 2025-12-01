const request = require('supertest');
const { MongoMemoryServer } = require('mongodb-memory-server');
const mongoose = require('mongoose');

// Aseguramos variables básicas para JWT
process.env.JWT_SECRET = process.env.JWT_SECRET || 'test_secret';
process.env.CLIENT_URL = 'http://localhost:5173';

const { app, connectDB } = require('../server');

describe('Auth endpoints', () => {
  let mongo;

  beforeAll(async () => {
    mongo = await MongoMemoryServer.create();
    const uri = mongo.getUri('hermanosjota_test');
    await connectDB(uri);
  });

  afterAll(async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    if (mongo) await mongo.stop();
  });

  it('registers and logs in a user', async () => {
    const email = `test${Date.now()}@mail.com`;
    const password = 'Secret123!';

    const registerRes = await request(app)
      .post('/api/auth/register')
      .send({ name: 'Tester', email, password })
      .expect(201);

    expect(registerRes.body.user.email).toBe(email);
    expect(registerRes.body.token).toBeDefined();

    const loginRes = await request(app)
      .post('/api/auth/login')
      .send({ email, password })
      .expect(200);

    expect(loginRes.body.user.email).toBe(email);
    expect(loginRes.body.token).toBeDefined();
  });
});
