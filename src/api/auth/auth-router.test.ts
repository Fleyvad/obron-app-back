import request from 'supertest';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import connectDB from '../../database/connection';
import app from '../../app';
import { UserModel, UserRegistration } from '../users/user-schema';
import { encryptPassword } from './auth-utils';
describe('Given an app with auth-router', () => {
  let mongoServer: MongoMemoryServer;

  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const mongoUrl = mongoServer.getUri();
    await connectDB(mongoUrl);
  });

  afterAll(async () => {
    await mongoServer.stop();
    await mongoose.connection.close();
  });

  describe('When a user wants to log in with an existing email and pasasword', () => {
    test('Then it should be logged in', async () => {
      const user = {
        email: 'paco@gmail.com',
        password: 'cont7rase',
      };
      const userDb = { ...user, password: encryptPassword(user.password) };
      await UserModel.create(userDb);

      await request(app).post('/auth/login').send(user).expect(201);
    });
  });

  describe('When a user wants to log in with an unexisting email', () => {
    test('Then it should a 404', async () => {
      const notExistUser = {
        email: 'pacso@gmail.com',
        password: 'cont7rase',
      };
      await request(app).post('/auth/login').send(notExistUser).expect(404);
    });
  });

  describe('When a user want to register with a correct email and password', () => {
    test('Then the user should be registered', async () => {
      const user: UserRegistration = {
        userName: 'paco',
        email: 'pacsso@gmail.com',
        password: 'cont7rase',
      };
      await request(app).post('/auth/register').send(user).expect(201);
    });
  });

  describe('When a user want to register when an existing email address', () => {
    test('Then it should returned a message error', async () => {
      const user: UserRegistration = {
        userName: 'pacso',
        email: 'paco@gmail.com',
        password: 'cosnt7rase',
      };
      await request(app).post('/auth/register').send(user).expect(409);
    });
  });

  describe('When a user wants to register with an invalid email format', () => {
    test('Then it should return an error message', async () => {
      const invalidFormatNewUser = {
        userName: 'paco',
        email: 'pacogmail.com',
        password: 'cont7rase',
      };
      const response = await request(app)
        .post('/auth/register')
        .send(invalidFormatNewUser)
        .expect(400);

      expect(response.body.msg.message).toEqual(
        '"email" must be a valid email',
      );
    });
  });
});
