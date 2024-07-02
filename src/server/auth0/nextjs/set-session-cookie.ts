import { serialize } from 'cookie';
import { cookies } from 'next/headers';

const MAX_COOKIE_SIZE = 4096;
const cookieName = process.env.AUTH0_SESSION_NAME ?? 'appSession';

export const setSessionCookie = (encryptedSession: string) => {
  const emptyCookie = serialize(`${cookieName}.0`, '', {});
  const chunkSize = MAX_COOKIE_SIZE - emptyCookie.length;
  const {
    getAll: getAllCookies,
    delete: deleteCookie,
    set: setCookie,
  } = cookies();

  const chunkCount = Math.ceil(encryptedSession.length / chunkSize);
  if (chunkCount === 1) {
    const chunkCookies = getAllCookies();
    chunkCookies.forEach((cookie) => {
      if (cookie.name.startsWith(cookieName)) {
        deleteCookie(cookie.name);
      }
    });
    setCookie(cookieName, encryptedSession, {
      sameSite: 'lax',
      httpOnly: true,
      secure: true,
      path: '/',
    });
    return;
  }

  for (let i = 0; i < chunkCount; i += 1) {
    const chunkValue = encryptedSession.slice(
      i * chunkSize,
      (i + 1) * chunkSize,
    );
    const chunkCookieName = `${cookieName}.${i}`;

    setCookie(chunkCookieName, chunkValue, {
      sameSite: 'lax',
      httpOnly: true,
      secure: true,
      path: '/',
    });
  }

  deleteCookie(cookieName);
};
