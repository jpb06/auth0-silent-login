import { ManagementClient } from 'auth0';

import { type NewUserPayload } from './types';

const getManagementClient = () =>
  new ManagementClient({
    domain: process.env.AUTH0_DOMAIN ?? '',
    clientId: process.env.AUTH0_CLIENT_ID ?? '',
    clientSecret: process.env.AUTH0_CLIENT_SECRET ?? '',
  });

export const createUser = async ({ email, password }: NewUserPayload) => {
  const managementClient = getManagementClient();

  await managementClient.users.create({
    email,
    password,
    connection: 'Username-Password-Authentication',
    email_verified: true,
    app_metadata: {
      accepted_terms_at: new Date().toISOString(),
    },
  });
};
