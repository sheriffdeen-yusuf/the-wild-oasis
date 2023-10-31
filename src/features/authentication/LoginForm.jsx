import { useState } from "react";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import Input from "../../ui/Input";
import FormRow from "../../ui/FormRow";
import { useAuth } from "./useAuth";
import SpinnerMini from "../../ui/SpinnerMini";

function LoginForm() {
  const { login, isLoading } = useAuth();
  const [email, setEmail] = useState("test@gmail.com");
  // const [password, setPassword] = useState("12345678");
  const [password, setPassword] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (!email || !password) return;
    login(
      { email, password },
      {
        onSettled: () => {
          setEmail("");
          setPassword("");
        },
      }
    );
  }

  return (
    <Form onSubmit={handleSubmit}>
      <label htmlFor="email">Email Username</label>
      <FormRow>
        <Input
          type="email"
          id="email"
          // This makes this form better for password managers
          autoComplete="username"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormRow>
      <label htmlFor="password">Password</label>
      <FormRow>
        <Input
          type="password"
          id="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </FormRow>
      <FormRow>
        <Button size="large" disabled={isLoading}>
          {isLoading ? <SpinnerMini /> : "Login"}
        </Button>
      </FormRow>
    </Form>
  );
}

export default LoginForm;
