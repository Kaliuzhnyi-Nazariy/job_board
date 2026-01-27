import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import z from "zod";
import { useAppDispatch } from "../../../features/hooks/dispatchHook";
import { signin } from "../../../features/auth/authRequest";
import ButtonAuth from "../../Components/Auth/ButtonAuth";
import { TextField } from "@mui/material";

import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

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
    formState: { errors, isValid },
  } = useForm({
    defaultValues: signinState,
    resolver: zodResolver(zodValidation),
    mode: "onChange",
  });

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<SignIn> = async (data) => {
    try {
      const payload = await dispatch(signin(data)).unwrap();

      if (payload.data === "employer") {
        await navigate("/employer/home");
      } else {
        await navigate("/candidate/home");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const [showPassword, setShowPassword] = useState(false);

  const errorMessage = "text-(--danger5) px-3 pt-1";

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="justify-self-center self-center w-134 ml-[10%]"
    >
      <div className="">
        <div className="">
          <h4>Sign in</h4>
          <p className="mt-4 body_medium text-(--gray6)">
            Don't have account{" "}
            <Link
              to="/auth/signup"
              className="text-(--primary5) body_medium_500"
            >
              Create account
            </Link>
          </p>
        </div>
      </div>
      <div className="my-8 flex flex-col gap-5">
        <div className="">
          <TextField
            variant="outlined"
            {...register("email")}
            placeholder="Email address"
            sx={{ width: "100%", height: "48px", padding: 0 }}
            InputProps={{
              sx: {
                height: "48px",
                // padding: "0 18px",
              },
            }}
          />
          <p>{errors.email?.message}</p>
        </div>
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
          <p className={errorMessage}>{errors.password?.message}</p>
        </div>

        <Link
          to="/forget-password"
          className="body_medium_500 text-(--primary5)"
        >
          Forget password
        </Link>
      </div>

      <ButtonAuth isButtonEnabled={isValid} text="Sign In" />
    </form>
  );
};

export default Signin;
