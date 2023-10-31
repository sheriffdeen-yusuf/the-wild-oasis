import { useForm } from "react-hook-form";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import { useSignUp } from "./useSignup";

// Email regex: /\S+@\S+\.\S+/

function SignupForm() {
  const { signUp, isLoading } = useSignUp();
  const {
    register,
    formState: { errors },
    handleSubmit,
    getValues,
    reset,
  } = useForm();

  function onSubmit({ fullName, email, password }) {
    signUp(
      { fullName, email, password },
      {
        onSettled: reset(),
      }
    );
  }
  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow lable="Full name" errors={errors?.fullName?.message}>
        <Input
          type="text"
          id="fullName"
          {...register("fullName", {
            required: "This field is required",
          })}
        />
      </FormRow>

      <FormRow lable="Email address" errors={errors?.email?.message}>
        <Input
          type="email"
          id="email"
          {...register("email", {
            required: "This field is required",
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "provide a valid email address",
            },
          })}
        />
      </FormRow>

      <FormRow
        lable="Password (min 8 characters)"
        errors={errors?.password?.message}
      >
        <Input
          type="password"
          id="password"
          {...register("password", {
            required: "This field is required",
            minLength: {
              value: 8,
              message: "password have to be minimum of 8 characters",
            },
          })}
        />
      </FormRow>

      <FormRow
        lable="Repeat password"
        errors={errors?.passwordConfirm?.message}
      >
        <Input
          type="password"
          id="passwordConfirm"
          {...register("passwordConfirm", {
            required: "This field is required",
            validate: (value) =>
              value === getValues().password || "password does not match",
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" disabled={isLoading} type="reset">
          Cancel
        </Button>
        <Button>Create new user</Button>
      </FormRow>
    </Form>
  );
}

export default SignupForm;
