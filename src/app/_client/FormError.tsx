import type { FunctionComponent } from 'react';

import type { ActionState } from '../_server';

type FormErrorProps = {
  state: ActionState;
};

export const FormError: FunctionComponent<FormErrorProps> = ({ state }) => {
  if (state.message.length === 0) {
    return null;
  }

  return (
    <span style={{ marginLeft: 5 }}>
      Server action {state.success ? 'success' : 'failure'}: {state.message}
    </span>
  );
};
