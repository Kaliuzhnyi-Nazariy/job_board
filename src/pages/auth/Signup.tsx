import { useState } from "react";
import { Controller, useForm, type SubmitHandler } from "react-hook-form";
import { Link } from "react-router";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAppDispatch } from "../../../features/hooks/dispatchHook";
import { signup } from "../../../features/auth/authRequest";
import { MenuItem, Select, TextField } from "@mui/material";

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
    <div className="grid grid-cols-2 w-full h-screen justify-between">
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
                >
                  <MenuItem value="employer">Employers</MenuItem>
                  <MenuItem value="candidate">Candidates</MenuItem>
                </Select>
              )}
            />
          </>
          {/* <select {...register("role")}>
              <option value="employer">Employers</option>
              <option value="candidate">Candidates</option>
            </select> */}
        </div>
        <p>{errors.role?.message}</p>
        <div className="mt-8">
          <div className="flex gap-5">
            <>
              <TextField
                id="outlined-basic"
                variant="outlined"
                {...register("fullName")}
                placeholder="Full Name"
                sx={{ height: "48px" }}
                InputProps={{
                  sx: {
                    height: "48px",
                    padding: "0 18px",
                  },
                }}
              />
              {/* <input
            type="text"
            {...register("fullName")}
            placeholder="Full Name"
          /> */}
              <p>{errors.fullName?.message}</p>
            </>
            <div>
              <TextField
                id="outlined-basic"
                variant="outlined"
                {...register("username")}
                placeholder="Username"
                sx={{ height: "48px" }}
                InputProps={{
                  sx: {
                    height: "48px",
                    padding: "0 18px",
                  },
                }}
              />
              {/* <input
                type="text"
                {...register("username")}
                placeholder="Username"
              /> */}
              <p className="text-[10px]">{errors.username?.message}</p>
            </div>
          </div>
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
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
            >
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
        </div>
      </form>
      <div className="relative h-full ">
        <div className="absolute w-full h-full bg-linear-[0deg,#041A3C_1%,#041a3c7c_100%,transparent]"></div>
        <img
          src="/public/checkered_flag.jpg"
          alt="checkered flag"
          className="h-full w-full object-none object-center"
        />
      </div>
    </div>
  );
};

export default Signup;
