export interface NewUserPayload {
  email: string;
  password: string;
}

export interface LoginResult {
  id_token: string;
  access_token: string;
  expires_in: string;
  scope: string;
}
