import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { Link } from "react-router";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAppDispatch } from "../../../features/hooks/dispatchHook";
import { signup } from "../../../features/auth/authRequest";

type AuthUser = {
  role: "candidate" | "employer";
  fullName: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const initialAuth: AuthUser = {
  role: "employer",
  fullName: "",
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const zodValidation = z.object({
  role: z.enum(["candidate", "employer"]),
  fullName: z.string(),
  username: z
    .string()
    .min(3, '"username" should be longer than 3 charaters')
    .max(16, '"username" can be 16 characters maximum'),
  email: z.email({ pattern: z.regexes.email }),
  password: z
    .string()
    .min(6, "Password should be at least 6 characters")
    .max(16, "Password must be mazimum 16 characters")
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{6,}$/),
  confirmPassword: z
    .string()
    .min(6, "Password should be at least 6 characters")
    .max(16, "Password must be mazimum 16 characters")
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{6,}$/),
});

const Signup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: initialAuth,
    resolver: zodResolver(zodValidation),
  });

  const dispatch = useAppDispatch();

  const onSubmit: SubmitHandler<AuthUser> = async (data) => {
    if (!isCheckTerms) return;
    await dispatch(signup(data));
    console.log(data);
  };

  const [showPassword, setShowPassword] = useState(false);

  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [isCheckTerms, setCheckTerms] = useState(false);

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="">
          <div className="">
            <h1>Create account.</h1>
            <p>
              Already have account? <Link to="/auth/signin">Log in</Link>
            </p>
          </div>
          <select {...register("role")}>
            <option value="employer">Employers</option>
            <option value="candidate">Candidates</option>
          </select>
        </div>
        <p>{errors.role?.message}</p>
        <input type="text" {...register("fullName")} placeholder="Full Name" />
        <p>{errors.fullName?.message}</p>
        <input type="text" {...register("username")} placeholder="Username" />
        <p>{errors.username?.message}</p>
        <input
          type="text"
          {...register("email")}
          placeholder="Emaill address"
        />
        <p>{errors.email?.message}</p>

        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            {...register("password")}
            placeholder="Password"
          />
          <button type="button" onClick={() => setShowPassword(!showPassword)}>
            eye
          </button>
        </div>
        <p>{errors.password?.message}</p>

        <div className="relative">
          <input
            type={showConfirmPassword ? "text" : "password"}
            {...register("confirmPassword")}
            placeholder="Confirm Password"
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            eye
          </button>
        </div>
        <p>{errors.confirmPassword?.message}</p>

        <label>
          {" "}
          <input
            type="checkbox"
            onChange={() => setCheckTerms(!isCheckTerms)}
          />
          I've read and agree with your Terms of Services
        </label>

        <button type="submit">Create account (right arrow)</button>
      </form>
    </>
  );
};

export default Signup;
