import { NextFunction, Request, Response } from 'express';
import { UserModel } from '../users/user-schema.js';
import {
  loginUserController,
  registerUserController,
} from './auth-controllers.js';
import dotenv from 'dotenv';
import { encryptPassword, generateJWTToken } from './auth-utils.js';
import { CustomHTTPError } from '../utils/errors/custom-http-error.js';
dotenv.config();

const OLD_ENV = process.env;

beforeEach(() => {
  jest.resetModules();
  process.env = { ...OLD_ENV };
});

afterAll(() => {
  process.env = OLD_ENV;
});
describe('Given a controller to log in a user', () => {
  const mockRequest = {
    body: {
      email: 'paco@gmail.com',
      password: 'cont7rase',
    },
  } as Partial<Request>;

  const mockResponse = {
    json: jest.fn(),
    status: jest.fn().mockReturnThis(),
    sendStatus: jest.fn(),
  } as Partial<Response>;

  UserModel.findOne = jest
    .fn()
    .mockImplementation(() => ({ exec: jest.fn().mockResolvedValue(null) }));

  const userLogin = {
    email: 'paco@gmail.com',
    password: encryptPassword('cont7rase'),
  };

  const next = jest.fn();

  const tokenJWT = {
    accessToken: generateJWTToken(mockRequest.body.email),
  };

  test('When the password encryption algorithm environment variable does not exist', async () => {
    delete process.env.PASSWORD_ENCRYPTION_ALGORITHM;

    await loginUserController(
      mockRequest as Request,
      mockResponse as Response,
      next as NextFunction,
    );

    expect(next).toHaveBeenCalled();
  });

  test('When the password encryption key environment variable does not exist', async () => {
    delete process.env.PASSWORD_ENCRYPTION_KEY;

    await loginUserController(
      mockRequest as Request,
      mockResponse as Response,
      next as NextFunction,
    );

    expect(next).toHaveBeenCalled();
  });

  test('When the user does not exist, then it should return a 404 error', async () => {
    await loginUserController(
      mockRequest as Request,
      mockResponse as Response,
      next as NextFunction,
    );

    expect(next).toHaveBeenCalledWith(
      new CustomHTTPError(404, 'This user does not exist'),
    );
  });

  test('When the jwt secret environment variable does not exist', async () => {
    delete process.env.JWT_SECRET;

    UserModel.findOne = jest
      .fn()
      .mockImplementation(() => ({ exec: jest.fn().mockResolvedValue(1) }));

    await loginUserController(
      mockRequest as Request,
      mockResponse as Response,
      next as NextFunction,
    );

    expect(next).toHaveBeenCalled();
  });

  test('When the user exits, it should be respond with a access token', async () => {
    UserModel.findOne = jest.fn().mockImplementation(() => ({
      exec: jest.fn().mockResolvedValue(userLogin),
    }));
    await loginUserController(
      mockRequest as Request,
      mockResponse as Response,
      jest.fn(),
    );
    expect(UserModel.findOne).toHaveBeenCalledWith({
      email: 'paco@gmail.com',
      password: 'dd37d8567a6ddff3d59fb778eef8b60e',
    });
    expect(mockResponse.status).toHaveBeenCalledWith(201);
    expect(mockResponse.json).toHaveBeenCalledWith(tokenJWT);
  });
});

describe('Given a registerUserController', () => {
  const request = {
    body: {
      userName: 'paco',
      email: 'paco@gmail.com',
      password: 'cont7rase',
    },
  } as Partial<Request>;

  const response = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
    sendStatus: jest.fn(),
  } as Partial<Response>;

  const next = jest.fn();

  const userRegister = {
    ...request.body,
    password: encryptPassword('cont7rase'),
  };

  test('When the user exits, it should be respond with a with status 409', async () => {
    UserModel.findOne = jest.fn().mockImplementation(() => ({
      exec: jest.fn().mockResolvedValue(userRegister),
    }));

    await registerUserController(
      request as Request,
      response as Response,
      next,
    );
    expect(next).toHaveBeenCalledWith(
      new CustomHTTPError(
        409,
        'A user account already exits with this email address',
      ),
    );
  });

  test('When the user does exits, it should be responde with status 201', async () => {
    UserModel.create = jest.fn();
    UserModel.findOne = jest.fn().mockImplementation(() => ({
      exec: jest.fn().mockResolvedValue(null),
    }));

    await registerUserController(
      request as Request,
      response as Response,
      next,
    );
    expect(UserModel.create).toBeCalledWith(userRegister);
    expect(response.status).toHaveBeenCalledWith(201);
    expect(response.json).toHaveBeenCalledWith({
      msg: 'User has been successfully registered',
    });
  });
});
