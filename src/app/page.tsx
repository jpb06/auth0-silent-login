import { createUserAndSilentLoginAction, Form } from "./_form";

const Home = () => <Form action={createUserAndSilentLoginAction} />;
export default Home;
