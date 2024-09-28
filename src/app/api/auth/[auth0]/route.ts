import { type ConfigParameters, initAuth0 } from '@auth0/nextjs-auth0';

import { getBaseUrl } from '../../../../server/get-base-url';

// We have a custom config...
const auth0Config: ConfigParameters = {
  baseURL: getBaseUrl(),
  session: {
    autoSave: false,
  },
};

const auth0 = initAuth0(auth0Config);

export const GET = auth0.handleAuth({
  login: auth0.handleLogin((_req) => {
    const returnTo = process.env.AUTH0_LOGIN_RETURN_TO ?? '/logged-in';

    return {
      returnTo,
    };
  }),
});
