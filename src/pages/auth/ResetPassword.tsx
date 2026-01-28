import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useParams } from "react-router";
import z from "zod";
import { useAppDispatch } from "../../../features/hooks/dispatchHook";
import { resetPassword } from "../../../features/auth/authRequest";
import type { IResponse } from "../../../features/auth/interface";
import { TextField } from "@mui/material";

import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import ButtonAuth from "../../Components/Auth/ButtonAuth";

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
    formState: { errors, isValid },
  } = useForm({
    defaultValues: resetPasswordState,
    resolver: zodResolver(zodValidation),
    mode: "onChange",
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
      }),
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
    <div className="absolute -translate-1/2 top-1/2 left-1/2 w-134 flex flex-col items-center text-center">
      <h4>Reset Password</h4>
      <article className="mt-6 body_medium text-(--grey6)">
        Duis luctus interdum metus, ut consectetur ante consectetur sed.
        Suspendisse euismod viverra massa sit amet mollis.
      </article>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-9 w-full">
        <div className="">
          <div className="relative">
            <TextField
              variant="outlined"
              {...register("password")}
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              sx={{ width: "100%", height: "48px", padding: 0 }}
              InputProps={{
                sx: {
                  height: "48px",
                  // padding: "0 18px",
                },
              }}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-0 top-1/2 -translate-1/2"
            >
              {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
            </button>
          </div>
          {errors.password && (
            <p className="text-(--danger5) px-3 pt-1">
              {errors.password?.message}
            </p>
          )}
        </div>
        <div className="mt-4 mb-9">
          <div className="relative">
            <TextField
              variant="outlined"
              {...register("confirmPassword")}
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm Password"
              sx={{ width: "100%", height: "48px", padding: 0 }}
              InputProps={{
                sx: {
                  height: "48px",
                  // padding: "0 18px",
                },
              }}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-0 top-1/2 -translate-1/2"
            >
              {showConfirmPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
            </button>
          </div>
          {errors.confirmPassword && (
            <p className="text-(--danger5) px-3 pt-1">
              {errors.confirmPassword?.message}
            </p>
          )}
        </div>
        <ButtonAuth isButtonEnabled={isValid} text="Reset Password" />
      </form>
    </div>
  );
};

export default ResetPassword;
