import { useForm, type SubmitHandler } from "react-hook-form";
import { useSelector } from "react-redux";
import { userFullName, userId } from "../../../../features/user/userSelector";
import { useEffect } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getCandidate,
  updateCandidatePersonal,
} from "../../../../features/candidate/candidatesRequsts";
import type { IUpdForm } from "../../../../features/candidate/interfaces";
import { useAppDispatch } from "../../../../features/hooks/dispatchHook";
import { getMe } from "../../../../features/user/userRequest";
import { InputAdornment, TextField } from "@mui/material";

import InsertLinkOutlinedIcon from "@mui/icons-material/InsertLinkOutlined";
import { errorToast, successToast } from "../../../Components/Toasts/Toasts";

const Personal = () => {
  const userFullNameValue = useSelector(userFullName);
  const userIdValue = useSelector(userId);

  const { data } = useQuery({
    queryKey: ["candidate", userIdValue],
    queryFn: () => getCandidate(userIdValue!),
  });

  const defaultValues: IUpdForm = {
    full_name: userFullNameValue || "",
    speciality: "",
    experience: "",
    education: "",
    website: "",
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues,
  });

  useEffect(() => {
    if (data) {
      reset({
        speciality: data.speciality,
        experience: data.experience,
        education: data.education,
        website: data.website,
      });
    }
  }, [data, reset]);

  const queryClient = useQueryClient();

  const dispatch = useAppDispatch();

  const { mutate } = useMutation({
    mutationKey: ["candidateUpdate"],
    mutationFn: (data: IUpdForm & { id: string }) =>
      updateCandidatePersonal(data),
    onSuccess: () => {
      dispatch(getMe());

      queryClient.invalidateQueries({
        queryKey: ["candidate", userIdValue],
      });

      successToast({ text: "Personal data updated successfully!" });
    },

    onError: (err) => {
      errorToast({
        text:
          (err as { message: string }).message ||
          "Personal data is not updated!",
      });
    },
  });

  const onSubmit: SubmitHandler<IUpdForm> = (data) => {
    // console.log(data);
    mutate({ ...data, id: userIdValue! });
  };

  const labelStyles = "body_small mb-2";

  return (
    <>
      <h6 className="body_large_500">Basic Information</h6>
      <form
        className="grid grid-cols-[1fr_3fr] gap-x-12 mt-4.5"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div>
          <label className={labelStyles}>Profile picture</label>
          <div className="w-60 h-67 border border-dashed border-black/50 mt-2"></div>
        </div>
        <div className="w-full grid grid-cols-2 gap-4.5">
          <div className="flex flex-col">
            <label className={labelStyles}>Full name</label>
            <TextField
              id="outlined"
              {...register("full_name")}
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
            {errors.full_name && <p>{errors.full_name?.message}</p>}
          </div>
          <div className="flex flex-col">
            <label className={labelStyles}>Title/headline</label>
            <TextField
              id="outlined"
              {...register("speciality")}
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
            {errors.speciality && <p>{errors.speciality?.message}</p>}
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
            {/* <input type="text" {...register("education")} /> */}
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
            <label className={labelStyles}>Personal website</label>
            {/* <input type="text" {...register("website")} /> */}
            <TextField
              id="outlined"
              {...register("website")}
              sx={{
                "& .css-16wblaj-MuiInputBase-input-MuiOutlinedInput-input": {
                  padding: "12px 18px",
                },
                "& .css-18p5xg2-MuiNotchedOutlined-root-MuiOutlinedInput-notchedOutline":
                  {
                    borderColor: "#e4e5e8",
                  },
              }}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <InsertLinkOutlinedIcon
                        className="rotate-135 font-light"
                        sx={{ fill: "#0a65cc" }}
                      />
                    </InputAdornment>
                  ),
                },
              }}
            />
            {errors.website && <p>{errors.website?.message}</p>}
          </div>
        </div>
        <button className="col-start-2 justify-self-start mt-8 px-8 py-4 bg-(--primary5) text-white button rounded-sm hover:cursor-pointer hover:bg-(--primary6) trasnition-colors duration-150">
          Save Changes
        </button>
      </form>
    </>
  );
};

export default Personal;
