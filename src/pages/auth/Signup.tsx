import { useState } from "react";
import { Link, useNavigate } from "react-router";

// form logic
import { Controller, useForm, type SubmitHandler } from "react-hook-form";
import { useAppDispatch } from "../../../features/hooks/dispatchHook";
import { signup } from "../../../features/auth/authRequest";

// form components
import { MenuItem, Select, TextField } from "@mui/material";
import ButtonAuth from "../../Components/Auth/ButtonAuth";

// validation
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// icons
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import PictureLayout from "./PictureLayout";
import { errorToast, successToast } from "../../Components/Toasts/Toasts";

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
    control,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: initialAuth,
    resolver: zodResolver(zodValidation),
    mode: "onChange",
  });

  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const onSubmit: SubmitHandler<AuthUser> = async (data) => {
    if (!isCheckTerms) return;

    try {
      await dispatch(signup(data)).unwrap();
      navigate("/");
      successToast({ text: "Account created successfully!" });
    } catch (error) {
      errorToast({
        text: (error as { message: string }).message || "Something went wrong!",
      });
    }
  };

  const [showPassword, setShowPassword] = useState(false);

  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [isCheckTerms, setCheckTerms] = useState(false);

  const errorMessage = "text-(--danger5) px-3 pt-1";

  const isButtonEnabled = isValid && isCheckTerms;

  return (
    <PictureLayout>
      {" "}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="justify-self-center self-center w-134 ml-[10%]"
      >
        <div className="flex justify-between items-center">
          <div className="w-78 flex flex-col gap-4">
            <h3>Create account.</h3>
            <p>
              <span className="body_medium text-(--gray6)">
                Already have account?
              </span>{" "}
              <Link
                to="/auth/signin"
                className="body_medium_500 text-(--primary5)"
              >
                Log in
              </Link>
            </p>
          </div>
          <>
            <Controller
              name="role"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  labelId="role-label"
                  id="role"
                  sx={{ width: "150px", height: "48px" }}
                  MenuProps={{
                    disableScrollLock: true,
                  }}
                >
                  <MenuItem value="employer">Employers</MenuItem>
                  <MenuItem value="candidate">Candidates</MenuItem>
                </Select>
              )}
            />
          </>
        </div>
        <p className={errorMessage}>{errors.role?.message}</p>
        <div className="mt-8 flex flex-col gap-5">
          <div className="flex gap-5">
            <>
              <TextField
                id="outlined-basic"
                variant="outlined"
                {...register("fullName")}
                placeholder="Full Name"
                sx={{ height: "48px", width: "258px", padding: 0 }}
                InputProps={{
                  sx: {
                    height: "48px",
                    "& .css-16wblaj-MuiInputBase-input-MuiOutlinedInput-input":
                      {
                        padding: "12px 18px",
                      },
                  },
                }}
              />
              <p className={errorMessage}>{errors.fullName?.message}</p>
            </>
            <div>
              <TextField
                id="outlined-basic"
                variant="outlined"
                {...register("username")}
                placeholder="Username"
                sx={{ height: "48px", width: "258px", padding: 0 }}
                InputProps={{
                  sx: {
                    height: "48px",
                    "& .css-16wblaj-MuiInputBase-input-MuiOutlinedInput-input":
                      {
                        padding: "12px 18px",
                      },
                  },
                }}
              />
              <p className={errorMessage}>{errors.username?.message}</p>
            </div>
          </div>
          <div className="">
            <TextField
              variant="outlined"
              {...register("email")}
              placeholder="Email address"
              sx={{ width: "100%", height: "48px", padding: 0 }}
              InputProps={{
                sx: {
                  height: "48px",
                  "& .css-16wblaj-MuiInputBase-input-MuiOutlinedInput-input": {
                    padding: "12px 18px",
                  },
                },
              }}
            />
            <p className={errorMessage}>{errors.email?.message}</p>
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
                    "& .css-16wblaj-MuiInputBase-input-MuiOutlinedInput-input":
                      {
                        padding: "12px 18px",
                      },
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
          <div className="">
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
                    "& .css-16wblaj-MuiInputBase-input-MuiOutlinedInput-input":
                      {
                        padding: "12px 18px",
                      },
                  },
                }}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-0 top-1/2 -translate-1/2"
              >
                {showConfirmPassword ? (
                  <VisibilityOffIcon />
                ) : (
                  <VisibilityIcon />
                )}
              </button>
            </div>
            <p className={errorMessage}>{errors.confirmPassword?.message}</p>
          </div>
          <label className="flex gap-2.5">
            {" "}
            <input
              type="checkbox"
              onChange={() => setCheckTerms(!isCheckTerms)}
              className="body_small"
            />
            <span className="w-full flex">
              <p>
                I've read and agree with your{" "}
                <Link to="/terms" className="text-(--primary5) font-medium">
                  Terms of Services
                </Link>
              </p>
            </span>
          </label>
          <ButtonAuth isButtonEnabled={isButtonEnabled} text="Create account" />
        </div>
      </form>
    </PictureLayout>
  );
};

export default Signup;
