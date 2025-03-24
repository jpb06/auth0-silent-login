'use server';

import { redirect } from 'next/navigation';

import {
  type NewUserPayload,
  createUser,
  silentLogin,
} from '../../server/auth0';
import {
  encrypt,
  getSessionPayload,
  setSessionCookie,
} from '../../server/auth0/nextjs';

export type ActionState = {
  message: string;
  success: boolean;
};

export const createUserAndSilentLoginAction =
  async (): Promise<ActionState> => {
    console.info('createUserAndSilentLoginAction');

    const data: NewUserPayload = {
      email: 'yolo@cool.com',
      password: 'azerty1A',
    };

    try {
      await createUser(data);
      const loginResult = await silentLogin(data);
      const session = getSessionPayload(loginResult, data.email);
      const encrypted = await encrypt(session);
      await setSessionCookie(encrypted);
    } catch (error) {
      console.error(error);
      if (error instanceof Error) {
        return {
          success: false,
          message: error.message,
        };
      }

      return {
        success: false,
        message: 'Oh no!',
      };
    } finally {
      redirect('/');
    }
  };
