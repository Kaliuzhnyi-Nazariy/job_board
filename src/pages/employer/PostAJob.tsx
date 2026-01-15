// TO-DO:
// error handling from tanstack

import { useForm, type SubmitHandler } from "react-hook-form";
import { type IJobForm } from "../../../features/job/interfaces";
import { postJob } from "../../../features/job/jobRequests";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";

const PostAJob = () => {
  const JobForm: IJobForm = {
    title: "",
    position: "",
    description: "",
    minSalary: 0,
    maxSalary: 0,
    salaryType: "month",
    workTime: "full_time",
    location: "",
    education: "",
    responsibilities: "",
    experience: "",
  };

  const jobValidation = z
    .object({
      title: z.string().min(3, "The title should be longer than 3 symbols!"),
      position: z.string(),
      description: z
        .string()
        .min(20, "Description should be at least 20 charachters long!")
        .max(1028, "Description shouldn't be longer than 1028 characters!"),
      minSalary: z.number().gt(-1, "The value cannot be negative!"),
      maxSalary: z.number().gt(-1, "The value cannot be negative!"),
      salaryType: z.enum(
        ["month", "week", "hour", "year", "contract"],
        'That field can be filled only with that values: "month", "week", "year", "contract"'
      ),
      workTime: z.enum(
        ["full_time", "part_time", "internship", "contract"],
        "That field can be filled only with that values: 'full_time', 'part_time', 'internship', 'contract' "
      ),
      location: z.string(),
      education: z.string().optional(),
      responsibilities: z
        .string()
        .max(1028, "responsibilities shouldn't be longer than 1028 characters!")
        .optional(),
      experience: z.string().optional(),
    })
    .refine((data) => data.maxSalary >= data.minSalary, {
      message: "Maximum salary should be higher or equal to minimal salary",
      path: ["maxSalary"],
    });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: JobForm,
    resolver: zodResolver(jobValidation),
  });

  const mutation = useMutation({
    mutationFn: (data: IJobForm) => postJob(data),
  });

  const submitHandler: SubmitHandler<IJobForm> = async (data) => {
    mutation.mutate(data);
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
          <input
            type="number"
            {...register("minSalary", { valueAsNumber: true })}
          />
        </div>
        <div className={inputBlock}>
          <label>Max Salary</label>
          <input
            type="number"
            {...register("maxSalary", { valueAsNumber: true })}
          />
        </div>
        <div className={inputBlock}>
          <label>Salary Type</label>
          {/* <input type="text" {...register("salaryType")} /> */}
          <select {...register("salaryType")}>
            <option value="month">month</option>
            <option value="week">week</option>
            <option value="hour">hour</option>
            <option value="year">year</option>
            <option value="contract">contract</option>
          </select>
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
            {/* <input type="text" {...register("workTime")} /> */}
            <select {...register("workTime")}>
              <option value="full_time">Full-time</option>
              <option value="part_time">Part-time</option>
              <option value="internship">internship</option>
              <option value="contract">contract</option>
            </select>
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
          <label>responsibilities</label>
          <textarea {...register("responsibilities")} />
        </div>

        <button disabled={mutation.isPending} className="disabled:opacity-50">
          Post Job
        </button>
      </form>
    </div>
  );
};

export default PostAJob;
