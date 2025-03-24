'use client';

import { type FunctionComponent, useActionState } from 'react';

import { type ActionState, createUserAndSilentLoginAction } from '../_server';
import { FormError } from './FormError';

export const Form: FunctionComponent = () => {
  const [state, formAction] = useActionState<ActionState, FormData>(
    createUserAndSilentLoginAction,
    {
      message: '',
      success: false,
    },
  );

  console.log(state);

  return (
    <form action={formAction}>
      <button>Login</button>
      <FormError state={state} />
    </form>
  );
};
