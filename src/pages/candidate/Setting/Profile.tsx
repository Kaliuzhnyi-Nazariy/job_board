import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useSelector } from "react-redux";
import { userId } from "../../../../features/user/userSelector";
import {
  getCandidate,
  updateCandidateProfile,
} from "../../../../features/candidate/candidatesRequsts";
import type { UpdateProfile } from "../../../../features/candidate/interfaces";
import { MenuItem, Select, TextField } from "@mui/material";

export type IGender = "Mr" | "Ms" | "Mx";
export interface IUpdProfile {
  dateOfBirth: string;
  gender: IGender;
  experience: string;
  education: string;
  biography: string;
}

export interface IUpdProfileSend {
  dateOfBirth: Date;
  gender: IGender;
  experience: string;
  education: string;
  biography: string;
}

const Profile = () => {
  const updForm: IUpdProfile = {
    dateOfBirth: "",
    gender: "Mr",
    education: "",
    experience: "",
    biography: "",
  };

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: updForm,
  });

  const { mutate } = useMutation({
    mutationKey: ["updateProfile"],
    mutationFn: (data: UpdateProfile) => updateCandidateProfile(data),
  });

  const handleSubmitUpdate: SubmitHandler<IUpdProfile> = async (data) => {
    mutate({ ...data, date_of_birth: new Date(data.dateOfBirth) });
  };

  const userIdValue = useSelector(userId);

  const { data } = useQuery({
    queryKey: ["candidate", userIdValue],
    queryFn: () => getCandidate(userIdValue!),
  });

  useEffect(() => {
    if (data) {
      const date =
        (data.date_of_birth && data.date_of_birth.split("T")[0]) ||
        "08-20-1995";

      reset({
        dateOfBirth: date || "",
        gender: data.gender || "Mr",
        education: data.education || "",
        experience: data.experience || "",
        biography: data.biography || "",
      });
    }
  }, [data, reset]);

  const labelStyles = "body_small mb-2";

  return (
    <form
      className="w-full grid grid-cols-2 gap-4.5"
      onSubmit={handleSubmit(handleSubmitUpdate)}
    >
      <div className="flex flex-col">
        <label className={labelStyles}>Date of birth</label>
        <TextField
          id="outlined"
          type="date"
          {...register("dateOfBirth")}
          sx={{
            "& .css-16wblaj-MuiInputBase-input-MuiOutlinedInput-input": {
              padding: "12px 18px",
            },
            "& .css-18p5xg2-MuiNotchedOutlined-root-MuiOutlinedInput-notchedOutline":
              {
                borderColor: "#e4e5e8",
              },
          }}
        />
      </div>
      <div className="flex flex-col">
        <label className={labelStyles}>Gender</label>
        <Select
          {...register("gender")}
          defaultValue={updForm.gender}
          sx={{
            "& .css-18jp67o-MuiNativeSelect-root-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input":
              {
                padding: "12px 18px",
              },
            "& .css-18p5xg2-MuiNotchedOutlined-root-MuiOutlinedInput-notchedOutline":
              {
                borderColor: "#e4e5e8",
              },
          }}
        >
          <MenuItem value="Mr">Mr</MenuItem>
          <MenuItem value="Ms">Ms</MenuItem>
          <MenuItem value="Mx">Mx</MenuItem>
        </Select>
      </div>
      <div className="flex flex-col">
        <label className={labelStyles}>Experience</label>
        <TextField
          id="outlined"
          {...register("experience")}
          sx={{
            "& .css-16wblaj-MuiInputBase-input-MuiOutlinedInput-input": {
              padding: "12px 18px",
            },
            "& .css-18p5xg2-MuiNotchedOutlined-root-MuiOutlinedInput-notchedOutline":
              {
                borderColor: "#e4e5e8",
              },
          }}
        />
        {errors.experience && <p>{errors.experience?.message}</p>}
      </div>
      <div className="flex flex-col">
        <label className={labelStyles}>Education</label>
        <TextField
          id="outlined"
          {...register("education")}
          sx={{
            "& .css-16wblaj-MuiInputBase-input-MuiOutlinedInput-input": {
              padding: "12px 18px",
            },
            "& .css-18p5xg2-MuiNotchedOutlined-root-MuiOutlinedInput-notchedOutline":
              {
                borderColor: "#e4e5e8",
              },
          }}
        />
        {errors.education && <p>{errors.education?.message}</p>}
      </div>
      <div className="flex flex-col col-start-1 col-end-3">
        <label className={labelStyles}>Biography</label>
        <TextField
          id="standard-multiline-static"
          multiline
          rows={10}
          placeholder="Write down your biography here. Let the employers know who you are..."
          variant="outlined"
          sx={{
            "& .css-xrmkj5-MuiInputBase-root-MuiOutlinedInput-root": {
              padding: "12px 18px",
            },
            "& .css-18p5xg2-MuiNotchedOutlined-root-MuiOutlinedInput-notchedOutline":
              {
                borderColor: "#e4e5e8",
              },
          }}
        />
      </div>

      <button className="px-8 py-4 bg-(--primary5) justify-self-start text-white rounded-sm button ">
        Save Changes
      </button>
    </form>
  );
};

export default Profile;
