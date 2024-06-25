import hkdf from '@panva/hkdf';

const BYTE_LENGTH = 32;
const ENCRYPTION_INFO = 'JWE CEK';

export const deriveKey = async (secret: string) =>
  await hkdf('sha256', secret, '', ENCRYPTION_INFO, BYTE_LENGTH);
