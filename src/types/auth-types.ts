import { User } from '../api/users/user-schema';

export type AuthRequest = Pick<User, 'userName' | 'email' | 'password'>;
export type AuthLoginRequest = Pick<User, 'email' | 'password'>;

export interface LoginResponse {
  accessToken: string;
}
