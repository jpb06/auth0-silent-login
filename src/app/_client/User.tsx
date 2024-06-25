'use client';

import { useUser } from '@auth0/nextjs-auth0/client';

export const User = () => {
  const { user, error, isLoading } = useUser();

  return (
    <>
      <div>
        {isLoading ? (
          <span>Loading</span>
        ) : user !== undefined ? (
          <span>Logged user: {JSON.stringify(user, null, 2)}</span>
        ) : (
          <span>Not logged in</span>
        )}
      </div>
      {error !== undefined ? <div>Error: {error.message}</div> : null}
    </>
  );
};
