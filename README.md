# auth0 silent login + nextjs

This is a reproduction repo for the following workflow requirement on auth0:

- Create a user.
- Silently log him in (the user typed his password once when entering his infos, we don't want to ask him again for credentials or prompt him for a consent).
- redirect him to a page on a nextjs app that requires a session.

## Workflow Steps

- Front - [Signup form](./src/app/page.tsx) - Have a form that targets a next server action. In real world we would have form data submitted to the action (email, password, etc..).
- Backend - [User creation](./src/server/auth0/create-user.ts) - User creation on auth0 user database using `auth0` node library.
- Backend - [Silent login](./src/server/auth0/silent-login.ts) - calling `/oauth/token` to retrieve an `id_token` and an `access_token`.
- Backend - [Session payload](./src/server/auth0/nextjs/get-session-payload.ts) - Generate a payload for the session to be stored on one or several cookies, depending on payload size.
- Backend - [Encrypt payload](./src/server/auth0/nextjs/encrypt.ts) - Encrypt the session payload using auth0 secret [generated earlier](https://github.com/auth0/nextjs-auth0?tab=readme-ov-file#getting-started).
- Backend - [Cookie creation](./src/server/auth0/nextjs/set-session-cookie.ts) - Set session cookie.
- Backend - [Redirect](./src/app/_form/create-user-and-silent-login.action.ts) - Finally, redirect to `/`.
- Frontend - [User is logged in](./src/app/_client/User.tsx) - See the user as logged in, per `@auth0/nextjs-auth0`.

## Encountered issues

### Logic redefinition

We essentially extracted logic from [nextjs-auth0](https://github.com/auth0/nextjs-auth0/blob/951a24864c61eec98702f91eb7784555d54916da/src/auth0-session/session/stateless-session.ts#L127):

- [Session payload definition](./src/server/auth0/nextjs/get-session-payload.ts)
- [Session payload encryption](./src/server/auth0/nextjs/encrypt.ts)
- [Cookies creation](./src/server/auth0/nextjs/set-session-cookie.ts)

Ideally, we would have preferred to use `nextjs-auth0` code for this, as redefining this logic in our own codebase exposes us to a regression risk if the logic changes in `nextjs-auth0` lib.

### Redirect + set cookie

When we redirect after setting a cookie, we have to do a client side refresh on the page; otherwise, the session will not be present client side.

See [48434](https://github.com/vercel/next.js/discussions/48434#discussioncomment-9216776)
