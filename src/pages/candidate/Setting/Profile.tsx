import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useSelector } from "react-redux";
import { userId } from "../../../../features/user/userSelector";
import { getCandidate } from "../../../../features/candidate/candidatesRequsts";

export type IGender = "Mr" | "Ms" | "Mx";
export interface IUpdProfile {
  dateOfBirth: string;
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

  const handleSubmitUpdate: SubmitHandler<IUpdProfile> = async (data) => {
    console.log(data);
  };

  const userIdValue = useSelector(userId);

  const { data } = useQuery({
    queryKey: ["candidate", userIdValue],
    queryFn: () => getCandidate(userIdValue!),
  });

  useEffect(() => {
    if (data) {
      const date = data.date_of_birth.split("T")[0];

      reset({
        dateOfBirth: date || "",
        gender: data.gender || "Mr",
        education: data.education || "",
        experience: data.experience || "",
        biography: data.biography || "",
      });
    }
  }, [data, reset]);

  return (
    <div>
      <form
        className="w-full grid grid-cols-2"
        onSubmit={handleSubmit(handleSubmitUpdate)}
      >
        <div className="flex flex-col">
          <label>Date of birth</label>
          <input type="date" {...register("dateOfBirth")} />
        </div>
        <div className="flex flex-col">
          <label>Gender</label>
          <select {...register("gender")} defaultValue={updForm.biography}>
            <option value="Mr">Mr</option>
            <option value="Ms">Ms</option>
            <option value="Mx">Mx</option>
          </select>
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
          <label>Biography</label>
          <textarea
            placeholder="Write down your biography here. Let the employers know who you are..."
            {...register("biography")}
          ></textarea>
        </div>

        <button>Save Changes</button>
      </form>
    </div>
  );
};

export default Profile;
