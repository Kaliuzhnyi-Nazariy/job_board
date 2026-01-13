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
    },
  });

  const onSubmit: SubmitHandler<IUpdForm> = (data) => {
    // console.log(data);
    mutate({ ...data, id: userIdValue! });
  };

  return (
    <div>
      <h2>Basic Information</h2>
      <form className="grid grid-cols-2" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Profile picture</label>
          <div className="w-60 h-67 border border-dashed border-black/50"></div>
        </div>
        <div className="w-full grid grid-cols-2">
          <div className="flex flex-col">
            <label>Full name</label>
            <input type="text" {...register("full_name")} />
            <p>{errors.full_name?.message}</p>
          </div>
          <div className="flex flex-col">
            <label>Title/headline</label>
            <input type="text" {...register("speciality")} />
            <p>{errors.speciality?.message}</p>
          </div>
          <div className="flex flex-col">
            <label>Experience</label>
            <input type="text" {...register("experience")} />
            <p>{errors.experience?.message}</p>
          </div>
          <div className="flex flex-col">
            <label>Education</label>
            <input type="text" {...register("education")} />
            <p>{errors.education?.message}</p>
          </div>
          <div className="flex flex-col col-start-1 col-end-3">
            <label>Personal website</label>
            <input type="text" {...register("website")} />
            <p>{errors.website?.message}</p>
          </div>
        </div>
        <button className="col-start-2 justify-self-start">Save Changes</button>
      </form>
    </div>
  );
};

export default Personal;
