import { Form, User } from './_client';
import { createUserAndSilentLoginAction } from './_server';

const Home = () => (
  <>
    <Form action={createUserAndSilentLoginAction} />
    <User />
  </>
);
export default Home;
