import { EncryptJWT } from 'jose';

import { deriveKey } from './derive-key';

interface EncryptionArgs {
  secret: string;
}

export const encrypt = async ({
  secret,
  ...payload
}: EncryptionArgs): Promise<string> => {
  const epochNow = Date.now() / 1000;
  const sevenDays = 7 * 24 * 60 * 60;
  const expirationTime = epochNow + sevenDays;

  const key = await deriveKey(secret);

  return await new EncryptJWT(payload)
    .setProtectedHeader({
      alg: 'dir',
      enc: 'A256GCM',
      uat: epochNow,
      iat: epochNow,
      exp: expirationTime,
    })
    .setIssuedAt(epochNow)
    .setExpirationTime(expirationTime)
    .encrypt(key);
};
