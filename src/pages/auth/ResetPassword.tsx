import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useNavigate, useParams } from "react-router";
import z from "zod";
import { resetPassword } from "../../../features/auth/authAPI";
import { TextField } from "@mui/material";

import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import ButtonAuth from "../../Components/Auth/ButtonAuth";
import { errorToast, successToast } from "../../Components/Toasts/Toasts";
import { useMutation } from "@tanstack/react-query";

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

  const navigate = useNavigate();

  const { mutate } = useMutation({
    mutationKey: ["resetPassword"],
    mutationFn: ({ data, token }: { data: ResetPassword; token: string }) =>
      resetPassword({ ...data, token }),
    onSuccess: () => {
      successToast({ text: "Password changed!" });
      navigate("/auth/signin");
    },
    onError: (error) => {
      errorToast({
        text: error.message || "Something went wrong!",
      });
    },
  });

  const onSubmit: SubmitHandler<ResetPassword> = async (data) => {
    if (data.password !== data.confirmPassword) {
      errorToast({ text: "Passwords are not match!" });
      return;
    }
    const token = path["*"];

    if (!token) {
      errorToast({ text: "Token is not found!" });
      return;
    }

    mutate({ data, token });
  };

  const [showPassword, setShowPassword] = useState(false);

  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <div className="absolute -translate-1/2 top-1/2 left-1/2 w-134 flex flex-col items-center text-center">
      <h4>Reset Password</h4>
      <article className="mt-6 body_medium text-(--gray6)">
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
