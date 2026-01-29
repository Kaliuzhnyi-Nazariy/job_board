import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type SubmitHandler } from "react-hook-form";
import { Link } from "react-router";
import z from "zod";
import { useAppDispatch } from "../../../features/hooks/dispatchHook";
import { forgetPassword } from "../../../features/auth/authRequest";
import type { IResponse } from "../../../features/auth/interface";
import { useState } from "react";
import { TextField } from "@mui/material";
import ButtonAuth from "../../Components/Auth/ButtonAuth";

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
    formState: { errors, isValid },
  } = useForm({
    defaultValues: forgetPasswordForm,
    resolver: zodResolver(zodValidator),
    mode: "onChange",
  });

  const dispatch = useAppDispatch();

  const [isEmailSent, setEmailSent] = useState(false);

  const onSubmit: SubmitHandler<ForgetPassword> = async (data) => {
    // console.log(data);
    const res = await dispatch(forgetPassword(data));

    if ((res.payload as IResponse).ok) {
      console.log("everything is working well");
      setEmailSent(true);
    }
  };

  return (
    <div className="justify-self-center self-center w-134">
      <h4>Forget Password</h4>
      <p className="body_medium text-(--gray6) mt-8 ">
        Go back to{" "}
        <Link to="/auth/signin" className="body_medium_500 text-(--primary5)">
          Sign In
        </Link>
      </p>
      <p className="body_medium text-(--gray6) mt-2">
        Don't have account{" "}
        <Link to="/auth/signup" className="body_medium_500 text-(--primary5)">
          Create Account
        </Link>
      </p>
      {isEmailSent ? (
        <p className="mt-8">Email is already sent!</p>
      ) : (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mt-8 w-full flex flex-col gap-8"
        >
          {/* <input type="email" {...register("email")} /> */}
          <div className="">
            <TextField
              id="outlined-basic"
              variant="outlined"
              {...register("email")}
              placeholder="Email address"
              sx={{ height: "48px", width: "100%", padding: 0 }}
              InputProps={{
                sx: {
                  height: "48px",
                  padding: 0,
                  // padding: "0 18px",
                },
              }}
            />
            {errors.email && (
              <p className="text-(--danger5) px-3 pt-1">
                {errors.email?.message}
              </p>
            )}
          </div>
          <ButtonAuth isButtonEnabled={isValid} text="Reset Password" />
        </form>
      )}
    </div>
  );
};

export default ForgetPassword;
