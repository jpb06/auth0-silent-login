import { decodeJwt } from 'jose';

import { type LoginResult } from '../types';

export const getSessionPayload = (
  { access_token, expires_in, id_token, scope }: LoginResult,
  email: string,
) => {
  const secret = process.env.AUTH0_SECRET;
  if (secret === undefined) {
    throw new Error('AUTH0_SECRET env variable secret not set');
  }

  const { nickname, name, picture, updated_at, email_verified, sub } =
    decodeJwt(id_token);

  return {
    secret,
    user: {
      nickname,
      name,
      picture,
      updated_at,
      email_verified,
      sub,
      email,
    },
    idToken: id_token,
    accessToken: access_token,
    accessTokenScope: scope,
    accessTokenExpiresAt: Date.now() + expires_in,
    createdAt: Date.now(),
  };
};
