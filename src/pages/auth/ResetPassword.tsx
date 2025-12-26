import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useParams } from "react-router";
import z from "zod";
import { useAppDispatch } from "../../../features/hooks/dispatchHook";
import { resetPassword } from "../../../features/auth/authRequest";
import type { IResponse } from "../../../features/auth/interface";

type ResetPassword = {
  password: string;
  confirmPassword: string;
};

const resetPasswordState: ResetPassword = {
  password: "",
  confirmPassword: "",
};

const ResetPassword = () => {
  const zodValidation = z.object({
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

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: resetPasswordState,
    resolver: zodResolver(zodValidation),
  });

  const path = useParams();

  const dispatch = useAppDispatch();

  const onSubmit: SubmitHandler<ResetPassword> = async (data) => {
    if (data.password !== data.confirmPassword) {
      return;
    }
    const token = path["*"];

    const res = await dispatch(
      resetPassword({
        password: data.password,
        confirmPassword: data.confirmPassword,
        token: token as string,
      })
    );

    if ((res.payload as IResponse).ok) {
      console.log("password changed successfully!");
    }

    // console.log(token);
    // console.log(data);
  };

  const [showPassword, setShowPassword] = useState(false);

  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <>
      <h1>Reset Password</h1>
      <article>
        Duis luctus interdum metus, ut consectetur ante consectetur sed.
        Suspendisse euismod viverra massa sit amet mollis.
      </article>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <input
            type={showPassword ? "text" : "password"}
            {...register("password")}
            placeholder="New Password"
          />
          <button type="button" onClick={() => setShowPassword(!showPassword)}>
            eye
          </button>
        </div>
        <p>{errors.password?.message}</p>
        <div>
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
        <button type="submit">Reset Password</button>
      </form>
    </>
  );
};

export default ResetPassword;
