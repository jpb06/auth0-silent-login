/* eslint-disable @typescript-eslint/naming-convention */
import { decodeJwt } from 'jose';

import { type LoginResult } from '../types';

export const getSessionPayload = (
  { access_token, expires_in, id_token, scope }: LoginResult,
  email: string,
) => {
  const { nickname, name, picture, updated_at, email_verified } =
    decodeJwt(id_token);

  return {
    secret: process.env.AUTH0_SECRET ?? '',
    user: {
      nickname,
      name,
      picture,
      updated_at,
      email_verified,
      sub: email,
      email,
    },
    idToken: id_token,
    accessToken: access_token,
    accessTokenScope: scope,
    accessTokenExpiresAt: Date.now() + expires_in,
    createdAt: Date.now(),
  };
};
