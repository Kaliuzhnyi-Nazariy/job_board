import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  deleteJob,
  getMyJob,
  updateMyJob,
} from "../../../../features/job/jobRequests";
import { useNavigate, useParams } from "react-router";
import type { IJobForm, Job } from "../../../../features/job/interfaces";
import { useEffect, useState } from "react";
import {
  useForm,
  type FieldError,
  type SubmitHandler,
  type UseFormRegisterReturn,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { JobValidation } from "./jobValidation";
import { workTimeFormat } from "../../../helpers/jobTimeFormat";
import DashboardSection from "../../../Components/Dashboard/DashboardSection";

const Job = () => {
  const { jobId } = useParams();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["myJob", jobId],
    queryFn: () => getMyJob(jobId!),
    enabled: !!jobId,
  });

  const [updateMode, setUpdateMode] = useState(false);

  const jobState: IJobForm = {
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

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<IJobForm>({
    defaultValues: jobState,
    resolver: zodResolver(JobValidation),
  });

  const salaryValue = (salary: string) => {
    // temprorary solution, in the future is planing to change .split on regex expression

    const splitSalary = salary.split("-");
    const minSalary = splitSalary[0].split("$")[1];
    const maxSalary = splitSalary[1].split("/")[0];

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
        responsibilities: job.responsibilities ?? "",
        workTime: job.work_time!,
        minSalary: salaryValue(job.salary).minSalary,
        maxSalary: salaryValue(job.salary).maxSalary,
        salaryType: salaryValue(job.salary).salaryType,
      });
    }
  }, [data, reset]);

  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationKey: ["updateJob"],
    mutationFn: (data: IJobForm) => updateMyJob({ data, jobId: jobId! }),
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: ["myJob", jobId],
      }),
  });

  const navigate = useNavigate();

  const { mutate: deleteJobMutation } = useMutation({
    mutationKey: ["deleteJob"],
    mutationFn: () => deleteJob(jobId!),
    onSuccess: () => {
      navigate("/employer/dashboard/my-jobs");
    },
  });

  if (isLoading) return <p>Loading...</p>;

  if (isError || !data?.job) return <p>No data</p>;

  const job: Job = data.job;

  const onSubmit: SubmitHandler<IJobForm> = async (data) => {
    mutate(data);
  };

  return (
    <DashboardSection>
      <div>
        {job ? (
          <form
            className="w-full flex flex-col"
            onSubmit={handleSubmit(onSubmit)}
          >
            <InfoField
              errors={errors.title}
              info={job.title}
              register={register("title")}
              title="Title"
              updateMode={updateMode}
              key={"title"}
            />

            <InfoField
              errors={errors.position}
              info={job.position}
              register={register("position")}
              title="Position"
              updateMode={updateMode}
              key={"position"}
            />

            <InfoField
              errors={errors.location}
              info={job.location}
              register={register("location")}
              title="location"
              updateMode={updateMode}
              key={"location"}
            />

            <div className="flex gap-2 mt-2">
              <label>
                <b>Salary: </b>
              </label>
              {updateMode ? (
                <>
                  <label>Minimal salary: </label>
                  <input
                    type="number"
                    {...register("minSalary", { valueAsNumber: true })}
                  />
                  {errors.minSalary && <p>{errors.minSalary?.message}</p>}

                  <label>Maximum salary: </label>
                  <input
                    type="number"
                    {...register("maxSalary", { valueAsNumber: true })}
                  />
                  {errors.maxSalary && <p>{errors.maxSalary?.message}</p>}

                  <label>Salery Type: </label>
                  <select {...register("salaryType")}>
                    <option value="month">month</option>
                    <option value="week">week</option>
                    <option value="hour">hour</option>
                    <option value="year">year</option>
                    <option value="contract">contract</option>
                  </select>
                  {errors.salaryType && <p>{errors.salaryType?.message}</p>}
                </>
              ) : (
                <p>{job.salary}</p>
              )}
            </div>

            <div className="flex gap-2 mt-2">
              <label>
                <b>Job Type: </b>
              </label>
              {updateMode ? (
                <>
                  <select {...register("workTime")}>
                    <option value="full_time">Full-Time</option>
                    <option value="part_time">Part-Time</option>
                    <option value="internship">Internship</option>
                    <option value="contract">Contract</option>
                  </select>

                  {errors.workTime && <p>{errors.workTime?.message}</p>}
                </>
              ) : (
                <p>{workTimeFormat(job.work_time!)}</p>
              )}
            </div>

            <InfoField
              errors={errors.education}
              info={job.education}
              register={register("education")}
              title="Education"
              updateMode={updateMode}
            />

            <InfoField
              errors={errors.experience}
              info={job.experience}
              register={register("experience")}
              title="Experience"
              updateMode={updateMode}
            />

            <div className="flex flex-col gap-2 not-first:mt-2">
              <label>
                <b>Description: </b>
              </label>
              {updateMode ? (
                <textarea {...register("description")} />
              ) : (
                <p>{job.description ? job.description : "No data"}</p>
              )}

              {errors.description && <p>{errors.description?.message}</p>}
            </div>

            <div className="flex flex-col gap-2 not-first:mt-2">
              <label>
                <b>Responsibilities: </b>
              </label>
              {updateMode ? (
                <textarea {...register("responsibilities")} />
              ) : (
                <p>{job.responsibilities ? job.responsibilities : "No data"}</p>
              )}

              {errors.responsibilities && (
                <p>{errors.responsibilities?.message}</p>
              )}
            </div>

            <ul className="flex w-full justify-around mt-4">
              <li>
                <button
                  type={updateMode ? "submit" : "button"}
                  className="cursor-pointer bg-(--primary5) text-white w-24 py-2 border border-transparent rounded-md hover:border-(--primary5) hover:text-(--primary5) hover:bg-white focus:border-(--primary5) focus:text-(--primary5) focus:bg-white transition-colors duration-200"
                  onClick={() => setUpdateMode(!updateMode)}
                >
                  {updateMode ? "Save" : "Update"}
                </button>
              </li>
              <li>
                <button
                  className="cursor-pointer bg-(--danger5) text-white w-24 py-2 border border-transparent rounded-md hover:border-(--danger5) hover:text-(--danger5) hover:bg-white focus:border-(--danger5) focus:text-(--danger5) focus:bg-white transition-colors duration-200 "
                  onClick={() => deleteJobMutation()}
                  type="button"
                >
                  Delete
                </button>
              </li>
            </ul>
          </form>
        ) : (
          <p>No data</p>
        )}
      </div>
    </DashboardSection>
  );
};

export default Job;

const InfoField = ({
  info,
  title,
  updateMode,
  register,
  errors,
}: // registerTitle,
{
  info: string | undefined;
  // registerTitle: Path<T>;
  title: string;
  updateMode: boolean;
  register: UseFormRegisterReturn;
  // register: UseFormRegister<T>;
  errors: FieldError | undefined;
}) => {
  return (
    <div className="flex flex-col gap-2 not-first:mt-2">
      <div className="flex items-center gap-1 md:flex-col md:items-start">
        <label>
          <b>{title}: </b>
        </label>
        {updateMode ? (
          // <input type="text" {...register} className="" />
          <input type="text" {...register} className="" />
        ) : (
          <p>{info ? info : "No data"}</p>
        )}
      </div>
      {errors && <p>{errors.message}</p>}
      {/* {errors.title && <p>{errors.title?.message}</p>} */}
    </div>
  );
};
