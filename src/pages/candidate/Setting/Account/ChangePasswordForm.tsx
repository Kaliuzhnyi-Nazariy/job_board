import { useState } from "react";
import { Controller, useForm, type SubmitHandler } from "react-hook-form";
import type { ChangePasswordState } from "../../../../../features/user/interfaces";
import { TextField } from "@mui/material";

import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import SettingsButton from "../../../../Components/SettingsButton";
import { useAppDispatch } from "../../../../../features/hooks/dispatchHook";
import { changePassword } from "../../../../../features/user/userRequest";

const ChangePasswordForm = () => {
  const defaultValues: ChangePasswordState = {
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  };

  const dispatch = useAppDispatch();

  const {
    control,
    // register,
    handleSubmit,
  } = useForm({ defaultValues });

  const labelStyles = "body_small mb-2";

  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handlePasswordSubmit: SubmitHandler<ChangePasswordState> = async (
    data,
  ) => {
    await dispatch(changePassword(data));
    // TO-DO: toasts
  };

  return (
    <form className="mt-4.5" onSubmit={handleSubmit(handlePasswordSubmit)}>
      <ul className="flex gap-4.5">
        <li>
          <label className={labelStyles}>Current Password</label>
          <div className="relative">
            <Controller
              name="oldPassword"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  type={showOldPassword ? "text" : "password"}
                  sx={{
                    "& .MuiOutlinedInput-input": {
                      padding: "12px 18px",
                    },
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#e4e5e8",
                    },
                  }}
                />
              )}
            />
            <button
              type="button"
              onClick={() => setShowOldPassword(!showOldPassword)}
              className="absolute right-4.5 top-1/2 -translate-y-1/2 size-5.5"
            >
              {showOldPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
            </button>
          </div>
        </li>
        <li>
          <label className={labelStyles}>New Password</label>
          <div className="relative">
            <Controller
              name="newPassword"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  type={showNewPassword ? "text" : "password"}
                  sx={{
                    "& .MuiOutlinedInput-input": {
                      padding: "12px 18px",
                    },
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#e4e5e8",
                    },
                  }}
                />
              )}
            />
            <button
              type="button"
              onClick={() => setShowNewPassword(!showNewPassword)}
              className="absolute right-4.5 top-1/2 -translate-y-1/2 size-5.5"
            >
              {showNewPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
            </button>
          </div>
        </li>
        <li>
          <label className={labelStyles}>Confirm Password</label>
          <div className="relative">
            <Controller
              name="confirmPassword"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  type={showConfirmPassword ? "text" : "password"}
                  sx={{
                    "& .MuiOutlinedInput-input": {
                      padding: "12px 18px",
                    },
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#e4e5e8",
                    },
                  }}
                />
              )}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-4.5 top-1/2 -translate-y-1/2 size-5.5"
            >
              {showConfirmPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
            </button>
          </div>
        </li>
      </ul>
      <SettingsButton></SettingsButton>
    </form>
  );
};

export default ChangePasswordForm;
