import { useForm, type SubmitHandler } from "react-hook-form";
import { useSelector } from "react-redux";
import {
  userFullName,
  userId,
  userPhoto,
} from "../../../../../features/user/userSelector";
import { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getCandidate,
  updateCandidatePersonal,
} from "../../../../../features/candidate/candidatesRequsts";
import type { IUpdForm } from "../../../../../features/candidate/interfaces";
import { useAppDispatch } from "../../../../../features/hooks/dispatchHook";
import { getMe } from "../../../../../features/user/userRequest";
import { InputAdornment, TextField } from "@mui/material";

import InsertLinkOutlinedIcon from "@mui/icons-material/InsertLinkOutlined";
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";

import { errorToast, successToast } from "../../../../Components/Toasts/Toasts";
import PersonalPhotoModal from "../../../../Components/modals/Applications/Settings/PersonalPhotoModal";
const PersonalDataForm = () => {
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

  const onSubmit: SubmitHandler<IUpdForm> = (newData) => {
    console.log({ newData });
    mutate({ ...newData, id: userIdValue! });
  };

  const labelStyles = "body_small mb-2";

  const [openModal, setModalOpen] = useState(false);

  const openModalFn = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const userPhotoLink = useSelector(userPhoto);

  return (
    <>
      <form
        className="grid grid-rows-auto grid-cols-1 min-[768px]:grid-cols-[1fr_3fr] gap-x-12 mt-4.5"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="justify-self-center min-[1024px]:justify-self-start">
          <label className={labelStyles}>Profile picture</label>
          <div
            className={
              "w-60 h-67 rounded-md mt-2 relative group " +
              (!userPhotoLink
                ? " border-2  border-dashed border-black/50 "
                : "")
            }
            onClick={() => openModalFn()}
          >
            {userPhotoLink && (
              <img
                src={userPhotoLink}
                alt="uesr photo"
                className="absolute top-1/2 -translate-y-1/2"
              />
            )}

            <div
              className={
                "flex flex-col gap-4 items-center text-center absolute  z-10 top-1/2 left-1/2 -translate-1/2  transition-all  " +
                (userPhotoLink ? " w-full h-full group-hover:bg-black/40 " : "")
              }
            >
              <div
                className={
                  userPhotoLink
                    ? "hidden group-hover:flex flex-col items-center justify-center text-white w-full h-full"
                    : "justify-center items-center"
                }
              >
                <CloudUploadOutlinedIcon
                  sx={{
                    fontSize: "48px",
                    color: `${userPhotoLink ? "#fff" : "#ADB2BA"}`,
                  }}
                />
                <div>
                  <b className="body_small_500">Browse photo</b>
                  <p
                    className={
                      "mt-1.5 body_xs text-(--gray5)" +
                      (userPhotoLink && " group-hover:text-white")
                    }
                  >
                    Max photo size 1 MB.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full mt-6 min-[1024px]:mt-0 grid min-[768px]:grid-cols-2 gap-4.5">
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
          <div className="flex flex-col min-[768px]:col-start-1 min-[768px]:col-end-3">
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
        <button className="min-[1024px]:col-start-2 justify-self-start mt-8 px-8 py-4 bg-(--primary5) text-white button rounded-sm hover:cursor-pointer hover:bg-(--primary6) trasnition-colors duration-150">
          Save Changes
        </button>
      </form>
      <PersonalPhotoModal
        open={openModal}
        handleClose={closeModal}
        isUserHasPhoto={Boolean(userPhotoLink)}
      />
    </>
  );
};

export default PersonalDataForm;
