"use client";

import type { FunctionComponent } from "react";

interface Props {
  action: () => Promise<void>;
}

export const Form: FunctionComponent<Props> = ({ action }) => (
  <form
    action={() => {
      void action();
    }}
  >
    <button>Login</button>
  </form>
);
