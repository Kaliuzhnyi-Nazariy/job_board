import { TextField } from "@mui/material";
import type { FieldError, UseFormRegisterReturn } from "react-hook-form";

const InfoField = ({
  info,
  title,
  updateMode,
  register,
  errors,
  specialData = false,
}: {
  info: string | undefined;
  title: string;
  updateMode: boolean;
  register: UseFormRegisterReturn;
  errors: FieldError | undefined;
  specialData?: boolean;
}) => {
  return (
    <div className="flex flex-col gap-2 not-first:mt-2">
      <div
        className={
          "grid items-center md:flex-col md:items-start " +
          (updateMode && specialData
            ? "gap-2 grid-cols-[repeat(1,1fr_2fr)]"
            : "gap-1 grid-cols-[repeat(1,1fr_3fr)]")
        }
      >
        <label>
          <b>{title}: </b>
        </label>
        {updateMode ? (
          <TextField
            placeholder="Add job tittle, role, vacancies etc"
            sx={{
              "& .css-16wblaj-MuiInputBase-input-MuiOutlinedInput-input": {
                padding: "12px 18px",
                fontWeight: "400",
                fontSize: "16px",
              },
            }}
            {...register}
          />
        ) : (
          <p>{info ? info : "No data"}</p>
        )}
      </div>
      {errors && <p>{errors.message}</p>}
    </div>
  );
};
export default InfoField;
