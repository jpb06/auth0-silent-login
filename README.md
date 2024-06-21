# auth0 silent login + nextjs

## Workflow Steps

- Front - [Signup form](./src/app/page.tsx) - Have a form that targets a next server action.
- Backend - [User creation](./src/server/create-user.ts) - User creation on auth0 user database using `auth0` node library.
- Backend - [Silent login](./src/server/silent-login.ts) - calling `/oauth/token` to retrieve an `id_token` and an `access_token`.
- Backend - [Redirect](./src/app/_form/create-user-and-silent-login.action.ts) - Setting `id_token` cookie and redirecting to `api/auth/callback`.

## Encountered issues

auth0 nextjs expects a state parameter in auth response:

```bash
CallbackHandlerError: Callback handler failed. CAUSE: Missing state parameter in Authorization Response.
    at eval (webpack-internal:///(rsc)/./node_modules/.pnpm/@auth0+nextjs-auth0@3.5.0_next@14.2.4_react-dom@18.3.1_react@18.3.1__react@18.3.1_/node_modules/@auth0/nextjs-auth0/dist/handlers/callback.js:64:15)
```

## Expected behavior

Be logged-in once we reach the callback endpoint, ie have a session.
