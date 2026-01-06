import { useForm, type SubmitHandler } from "react-hook-form";
import { type IJobForm } from "../../../features/job/interfaces";
import { useAppDispatch } from "../../../features/hooks/dispatchHook";
import { postJob } from "../../../features/job/jobRequest";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const PostAJob = () => {
  const JobForm: IJobForm = {
    title: "",
    position: "",
    description: "",
    minSalary: "",
    maxSalary: "",
    salaryType: "month",
    workTime: "full_time",
    location: "",
    education: "",
    responsobilities: "",
    experience: "",
  };

  const jobValidation = z.object({
    title: z.string().min(3, "The title should be longer than 3 symbols!"),
    position: z.string(),
    description: z
      .string()
      .min(20, "Description should be at least 20 charachters long!")
      .max(1028, "Description shouldn't be longer than 1028 characters!"),
    minSalary: z.string(),
    maxSalary: z.string(),
    salaryType: z.enum(
      ["month", "week", "year", "contract"],
      'That field can be filled only with that values: "month", "week", "year", "contract"'
    ),
    workTime: z.enum(
      ["full_time", "part_time", "internship", "contract"],
      "That field can be filled only with that values: 'full_time', 'part_time', 'internship', 'contract' "
    ),
    location: z.string(),
    education: z.string().optional(),
    responsobilities: z
      .string()
      .max(1028, "Responsobilities shouldn't be longer than 1028 characters!")
      .optional(),
    experience: z.string().optional(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: JobForm,
    resolver: zodResolver(jobValidation),
  });

  const dispatch = useAppDispatch();

  const submitHandler: SubmitHandler<IJobForm> = async (data) => {
    // console.log(data);
    if (data.maxSalary < data.minSalary) return;
    await dispatch(postJob(data));
  };

  console.log({ errors });

  const inputBlock = "flex flex-col";

  return (
    <div>
      <h2>Post a job</h2>
      <form onSubmit={handleSubmit(submitHandler)}>
        <div className={inputBlock}>
          <label>Job title</label>
          <input type="text" {...register("title")} />
        </div>

        <h3>Salary</h3>

        <div className={inputBlock}>
          <label>Min Salary</label>
          <input type="number" {...register("minSalary")} />
        </div>
        <div className={inputBlock}>
          <label>Max Salary</label>
          <input type="number" {...register("maxSalary")} />
        </div>
        <div className={inputBlock}>
          <label>Salary Type</label>
          <input type="text" {...register("salaryType")} />
        </div>

        <h3>Advance Information</h3>

        <div>
          <div className={inputBlock}>
            <label>Education</label>
            <input type="text" {...register("education")} />
          </div>
          <div className={inputBlock}>
            <label>Experience</label>
            <input type="text" {...register("experience")} />
          </div>
          <div className={inputBlock}>
            <label>Job Type</label>
            <input type="text" {...register("workTime")} />
          </div>
          <div className={inputBlock}>
            <label>Job level</label>
            <input type="text" {...register("position")} />
          </div>
          <div className={inputBlock}>
            <label>Job location</label>
            <input type="text" {...register("location")} />
          </div>
        </div>

        <h3>Description & Responsibility</h3>

        <div className={inputBlock}>
          <label>Description</label>
          <textarea {...register("description")} />
        </div>

        <div className={inputBlock}>
          <label>Responsobilities</label>
          <textarea {...register("responsobilities")} />
        </div>

        <button>Post Job</button>
      </form>
    </div>
  );
};

export default PostAJob;
