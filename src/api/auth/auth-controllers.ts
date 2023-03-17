import { RequestHandler } from 'express';
import { AuthRequest, LoginResponse } from '../../types/auth-types.js';
import { UserModel } from '../users/user-schema.js';
import { CustomHTTPError } from '../utils/errors/custom-http-error.js';
import { encryptPassword, generateJWTToken } from './auth-utils.js';

export const loginUserController: RequestHandler<
  unknown,
  LoginResponse | { message: string },
  AuthRequest
> = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const filterUser = {
      email,
      password: encryptPassword(password),
    };
    const existingUser = await UserModel.findOne(filterUser).exec();

    if (existingUser === null) {
      // Return res.status(404).json({ message: 'This user does not exist' });
      return next(new CustomHTTPError(404, 'This user does not exist'));
    }

    const userToken = generateJWTToken(email);

    res.status(201).json({ accessToken: userToken });
  } catch (error) {
    next(error);
  }
};
