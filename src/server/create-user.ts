import { getManagementClient } from "./management-client";
import { type NewUserPayload } from "./types";

export const createUser = async ({ email, password }: NewUserPayload) => {
  const managementClient = getManagementClient();

  await managementClient.users.create({
    email,
    password,
    connection: "Username-Password-Authentication",
    email_verified: true,
    app_metadata: {
      accepted_terms_at: new Date().toISOString(),
    },
  });
};
