import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import z from "zod";
import { useAppDispatch } from "../../../features/hooks/dispatchHook";
import { signin } from "../../../features/auth/authRequest";
// import type { ISignInResponse } from "../../../features/auth/interface";
// import type { IResponse } from "../../../features/auth/interface";

type SignIn = {
  email: string;
  password: string;
};

const signinState: SignIn = {
  email: "",
  password: "",
};

const zodValidation = z.object({
  email: z.email({ pattern: z.regexes.email }),
  password: z
    .string()
    .min(6, "Password should be at least 6 characters")
    .max(16, "Password must be mazimum 16 characters"),
});

const Signin = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: signinState,
    resolver: zodResolver(zodValidation),
  });

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<SignIn> = async (data) => {
    // // console.log(data);
    // const res = await dispatch(signin(data));
    // if ((res.payload as IResponse).ok) {
    //   console.log("redirect to /home");
    //   console.log(res.payload?.data);
    //   if (res.payload?.data === "employer") {
    //     navigate("/employer/home");
    //   } else {
    //     navigate("/candidate/home");
    //   }
    // }
    try {
      const payload = await dispatch(signin(data)).unwrap();

      // payload is now SUCCESS ONLY
      if (payload.data === "employer") {
        await navigate("/employer/home");
      } else {
        await navigate("/candidate/home");
      }
    } catch (err) {
      // rejected case (errorHandler / rejectedWithValue)
      console.error(err);
    }
  };

  const [showPassword, setShowPassword] = useState(false);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="">
        <div className="">
          <h1>Sign in</h1>
          <p>
            Don't have account <Link to="/auth/signup">Create account</Link>
          </p>
        </div>
      </div>
      <input type="text" {...register("email")} placeholder="Emaill address" />
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
      <Link to="/forget-password">Forget password</Link>

      <button type="submit">Create account (right arrow)</button>
    </form>
  );
};

export default Signin;
