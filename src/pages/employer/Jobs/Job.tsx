import { useQuery } from "@tanstack/react-query";
import { getMyJob } from "../../../../features/job/jobRequests";
import { useParams } from "react-router";
import type { IJobFormUpdate, Job } from "../../../../features/job/interfaces";
import { useEffect, useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { JobValidation } from "./jobValidation";

// TO-DO:
// make form and default values take from data from backend
// change values in input on form values

const Job = () => {
  const { jobId } = useParams();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["myJob"],
    queryFn: () => getMyJob(jobId!),
  });

  const [updateMode, setUpdateMode] = useState(false);

  const jobState: IJobFormUpdate = {
    title: "",
    position: "",
    description: "",
    // minSalary: job.minSalary || 0,
    // maxSalary: job.maxSalary || 0,
    // salaryType: job. || "month",
    minSalary: 0,
    maxSalary: 0,
    salaryType: "month",
    workTime: "Full-Time",
    location: "",
    education: "",
    responsobilities: "",
    experience: "",
  };

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<IJobFormUpdate>({
    defaultValues: jobState,
    resolver: zodResolver(JobValidation),
  });

  const workTimeView = (
    workTime: "full_time" | "part_time" | "internship" | "contract"
  ) => {
    switch (workTime) {
      case "full_time":
        return "Full-Time";
      case "part_time":
        return "Part-Time";
      case "contract":
        return "Contract";
      case "internship":
        return "Internship";
      default:
        return "Full-Time";
    }
  };

  const salaryValue = (salary: string) => {
    // temprorary decision, in the future is planing to change .split on regex expression

    const splitSalary = salary.split("-");
    const minSalary = splitSalary[0].split("$")[1];
    const maxSalary = splitSalary[1].split("$")[1].split("/")[0];

    const salaryType = splitSalary[1].split("/")[1];

    return {
      minSalary: Number(minSalary) as number,
      maxSalary: Number(maxSalary) as number,
      salaryType: salaryType as "month" | "week" | "hour" | "year" | "contract",
    };
  };

  useEffect(() => {
    if (data && data.job) {
      const job: Job = data.job;

      reset({
        title: job.title ?? "",
        position: job.position ?? "",
        description: job.description ?? "",
        location: job.location ?? "",
        education: job.education ?? "",
        experience: job.experience ?? "",
        responsobilities: job.responsobilities ?? "",
        workTime: workTimeView(job.work_time!),
        minSalary: salaryValue(job.salary).minSalary,
        maxSalary: salaryValue(job.salary).maxSalary,
        salaryType: salaryValue(job.salary).salaryType,
      });
    }
  }, [data, reset]);

  if (isLoading) return <p>Loading...</p>;

  if (isError || !data?.job) return <p>No data</p>;

  const job: Job = data.job;

  const onSubmit: SubmitHandler<IJobFormUpdate> = async (data) => {
    console.log(data);
  };

  return (
    <div>
      <div>
        {job ? (
          <form
            className="w-full flex flex-col"
            onSubmit={handleSubmit(onSubmit)}
          >
            <label>Title: </label>
            {updateMode ? (
              <input type="text" {...register("title")} />
            ) : (
              <p>{job.title}</p>
            )}
            <p>{errors.title?.message}</p>

            <label>Position: </label>
            {updateMode ? (
              <input type="text" {...register("position")} />
            ) : (
              <p>{job.position}</p>
            )}
            <p>{errors.position?.message}</p>

            <label>Location: </label>
            {updateMode ? (
              <input type="text" {...register("location")} />
            ) : (
              <p>{job.location}</p>
            )}
            <p>{errors.location?.message}</p>

            <label>Salary: </label>
            {updateMode ? (
              <>
                <label>Minimal salary: </label>
                <input
                  type="number"
                  {...register("minSalary", { valueAsNumber: true })}
                />
                <p>{errors.minSalary?.message}</p>

                <label>Maximum salary: </label>
                <input
                  type="number"
                  {...register("maxSalary", { valueAsNumber: true })}
                />
                <p>{errors.maxSalary?.message}</p>

                <label>Salery Type: </label>
                <select {...register("salaryType")}>
                  <option value="month">month</option>
                  <option value="week">week</option>
                  <option value="hour">hour</option>
                  <option value="year">year</option>
                  <option value="contract">contract</option>
                </select>
                <p>{errors.salaryType?.message}</p>
              </>
            ) : (
              <p>{job.salary}</p>
            )}

            <label>Job Type</label>
            {updateMode ? (
              <>
                <select {...register("workTime")}>
                  <option value="Full-Time">Full-Time</option>
                  <option value="Part-Time">Part-Time</option>
                  <option value="Internship">Internship</option>
                  <option value="Contract">Contract</option>
                </select>

                <p>{errors.workTime?.message}</p>
              </>
            ) : (
              <p>{workTimeView(job.work_time!)}</p>
            )}

            <label>Education</label>
            {updateMode ? (
              <input type="text" {...register("education")} />
            ) : (
              <p>{job.experience || "No experience"}</p>
            )}
            <p>{errors.education?.message}</p>

            <label>Experience:</label>
            {updateMode ? (
              <input type="text" {...register("experience")} />
            ) : (
              <p>{job.experience ?? "No experience"}</p>
            )}
            <p>{errors.experience?.message}</p>

            <label>Description: </label>
            {updateMode ? (
              <textarea {...register("description")} />
            ) : (
              <article>{job.description ?? "No descripton"}</article>
            )}
            <p>{errors.description?.message}</p>

            <label>Responsobilities: </label>
            {updateMode ? (
              <textarea {...register("responsobilities")} />
            ) : (
              <article>{job.responsobilities ?? "No responsobilities"}</article>
            )}
            <p>{errors.responsobilities?.message}</p>

            <button
              type={!updateMode ? "submit" : "button"}
              className="cursor-pointer"
              onClick={() => setUpdateMode(!updateMode)}
            >
              {updateMode ? "Save" : "Update"}
            </button>
          </form>
        ) : (
          <p>No data</p>
        )}
      </div>
    </div>
  );
};

export default Job;
