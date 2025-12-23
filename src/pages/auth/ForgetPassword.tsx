import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type SubmitHandler } from "react-hook-form";
import { Link } from "react-router";
import z from "zod";

type ForgetPassword = {
  email: string;
};

const forgetPasswordForm: ForgetPassword = {
  email: "",
};

const ForgetPassword = () => {
  const zodValidator = z.object({
    email: z.string().regex(z.regexes.email, "Email is invalid!"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: forgetPasswordForm,
    resolver: zodResolver(zodValidator),
  });

  const onSubmit: SubmitHandler<ForgetPassword> = (data) => {
    console.log(data);
  };

  return (
    <>
      <h1>Forget Password</h1>
      <p>
        Go back to <Link to="/auth/signin">Sign In</Link>
      </p>
      <p>
        Don't have account <Link to="/auth/signup">Create Account</Link>
      </p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="email" {...register("email")} />
        <p>{errors.email?.message}</p>
        <button type="submit">Reset Password (right arrow)</button>
      </form>
    </>
  );
};

export default ForgetPassword;
