'use client';

import { useUser } from '@auth0/nextjs-auth0';

export const User = () => {
  const { user, error, isLoading } = useUser();

  return (
    <div style={{ marginTop: 10 }}>
      <div>
        {isLoading ? (
          <span>Loading</span>
        ) : user !== undefined ? (
          <span>Logged user: {JSON.stringify(user, null, 2)}</span>
        ) : (
          <span>Not logged in</span>
        )}
      </div>
      {error ? <div>Use user error: {error.message}</div> : null}
    </div>
  );
};
