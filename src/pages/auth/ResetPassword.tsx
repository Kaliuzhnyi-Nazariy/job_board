import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import z from "zod";

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

  const onSubmit: SubmitHandler<ResetPassword> = (data) => {
    if (data.password !== data.confirmPassword) {
      return;
    }
    console.log(data);
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
