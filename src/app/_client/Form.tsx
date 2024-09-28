'use client';

import type { FunctionComponent } from 'react';

interface Props {
  action: () => Promise<void>;
}

export const Form: FunctionComponent<Props> = ({ action }) => (
  <form
    action={() => {
      action();
    }}
  >
    <button>Login</button>
  </form>
);
