'use server';

import { redirect } from 'next/navigation';

import {
  createUser,
  silentLogin,
  type NewUserPayload,
} from '../../server/auth0';
import {
  encrypt,
  getSessionPayload,
  setSessionCookie,
} from '../../server/auth0/nextjs';

export const createUserAndSilentLoginAction = async () => {
  console.info('createUserAndSilentLoginAction');

  const data: NewUserPayload = {
    email: 'yolo@cool.com',
    password: 'azerty1A',
  };

  await createUser(data);
  const loginResult = await silentLogin(data);
  const session = getSessionPayload(loginResult, data.email);
  const encrypted = await encrypt(session);
  setSessionCookie(encrypted);

  redirect('/');
};
