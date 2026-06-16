import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  deleteJob,
  getMyJob,
  updateMyJob,
} from "../../../../features/job/jobRequests";
import { useNavigate, useParams } from "react-router";
import type { IJobForm, Job } from "../../../../features/job/interfaces";
import { useEffect, useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { JobValidation } from "./jobValidation";
import { workTimeFormat } from "../../../helpers/jobTimeFormat";
import DashboardSection from "../../../Components/Dashboard/DashboardSection";
import { MenuItem, Select, TextField } from "@mui/material";
import Buttons from "../../../Components/Job/JobButtons/Buttons";
import InfoField from "../../../Components/Job/InfoField";

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
    // reset,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<IJobForm>({
    defaultValues: jobState,
    resolver: zodResolver(JobValidation),
  });

  const salaryValue = (salary: string) => {
    // temprorary solution, in the future is planing to change .split on regex expression

    const splitSalary = salary.split("-");
    const minSalary = splitSalary[0].split("$")[1];
    const maxSalary = splitSalary[1].split("/")[0].split("$")[1];

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

      setValue("title", job.title ?? "");
      setValue("position", job.position ?? "");
      setValue("description", job.description ?? "");
      setValue("location", job.location ?? "");
      setValue("education", job.education ?? "");
      setValue("experience", job.experience ?? "");
      setValue("responsibilities", job.responsibilities ?? "");
      setValue("workTime", job.work_time!);
      setValue("minSalary", salaryValue(job.salary).minSalary);
      setValue("maxSalary", salaryValue(job.salary).maxSalary);
      setValue("salaryType", salaryValue(job.salary).salaryType);
    }
  }, [data, setValue]);

  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationKey: ["updateJob"],
    mutationFn: (data: IJobForm) => updateMyJob({ data, jobId: jobId! }),
    onSuccess: () => {
      console.log("it is success");
      queryClient.invalidateQueries({
        queryKey: ["myJob", jobId],
      });
      setUpdateMode(false);
    },
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

  const inputBlock = "flex flex-col";

  const errorMessage = "text-(--danger5) pt-1 text-[8px]";

  return (
    <DashboardSection>
      {updateMode && <h5>Update a job application</h5>}
      {job ? (
        <form
          className="w-full flex flex-col mt-4"
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

          <div className={"flex gap-2 mt-2 " + (updateMode && "flex-col")}>
            <label>
              <b>Salary: </b>
            </label>
            {updateMode ? (
              <div className="grid grid-cols-3 gap-4.5">
                <div className={inputBlock}>
                  <label className="body_small">Min Salary</label>
                  <TextField
                    placeholder="minimum salary..."
                    type="number"
                    {...register("minSalary", { valueAsNumber: true })}
                    sx={{
                      "& .css-16wblaj-MuiInputBase-input-MuiOutlinedInput-input":
                        {
                          padding: "12px 18px",
                          fontWeight: "400",
                          fontSize: "16px",
                        },
                      "& .css-quhxjy-MuiInputBase-root-MuiOutlinedInput-root": {
                        marginTop: "8px",
                      },
                    }}
                  />
                  {errors.minSalary?.message && (
                    <p className={errorMessage}>{errors.minSalary?.message}</p>
                  )}
                </div>
                <div className={inputBlock}>
                  <label className="body_small">Max Salary</label>
                  <TextField
                    placeholder="maximum salary..."
                    type="number"
                    {...register("maxSalary", { valueAsNumber: true })}
                    sx={{
                      "& .css-16wblaj-MuiInputBase-input-MuiOutlinedInput-input":
                        {
                          padding: "12px 18px",
                          fontWeight: "400",
                          fontSize: "16px",
                        },
                      "& .css-quhxjy-MuiInputBase-root-MuiOutlinedInput-root": {
                        marginTop: "8px",
                      },
                    }}
                  />
                  {errors.maxSalary?.message && (
                    <p className={errorMessage}>{errors.maxSalary?.message}</p>
                  )}
                </div>
                <div className={inputBlock}>
                  <label className="body_small">Salary Type</label>
                  <Select
                    defaultValue="month"
                    {...register("salaryType")}
                    sx={{
                      marginTop: "8px",
                      "& .MuiOutlinedInput-root": {
                        height: 48,
                      },
                      "& .MuiOutlinedInput-input": {
                        padding: "12px 16px 12px 18px",
                      },
                    }}
                    MenuProps={{
                      disableScrollLock: true,
                    }}
                  >
                    <MenuItem value="month">Month</MenuItem>
                    <MenuItem value="week">Week</MenuItem>
                    <MenuItem value="hour">Hour</MenuItem>
                    <MenuItem value="year">Year</MenuItem>
                    <MenuItem value="contract">Contract</MenuItem>
                  </Select>
                  {errors.salaryType?.message && (
                    <p className={errorMessage}>{errors.salaryType?.message}</p>
                  )}
                </div>
              </div>
            ) : (
              <p>{job.salary}</p>
            )}
          </div>

          <div
            className={
              "grid gap-2 mt-2 items-center " +
              (updateMode && "grid-cols-[repeat(1,1fr_2fr)]")
            }
          >
            {/* <div className="flex gap-2 mt-2 items-center"> */}
            <label>
              <b>Job Type: </b>
            </label>
            {updateMode ? (
              <>
                <Select
                  defaultValue="full_time"
                  {...register("workTime")}
                  sx={{
                    // marginTop: "8px",
                    "& .MuiOutlinedInput-root": {
                      height: 48,
                    },
                    "& .MuiOutlinedInput-input": {
                      padding: "12px 16px 12px 18px",
                    },
                  }}
                  MenuProps={{
                    disableScrollLock: true,
                  }}
                >
                  <MenuItem value="full_time">Full-Time</MenuItem>
                  <MenuItem value="part_time">Part-Time</MenuItem>
                  <MenuItem value="internship">Internship</MenuItem>
                  <MenuItem value="contract">Contract</MenuItem>
                </Select>

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
            specialData
          />

          <InfoField
            errors={errors.experience}
            info={job.experience}
            register={register("experience")}
            title="Experience"
            updateMode={updateMode}
            specialData
          />

          <div className="flex flex-col gap-2 not-first:mt-2">
            <label>
              <b>Description: </b>
            </label>
            {updateMode ? (
              <TextField
                id="standard-multiline-static"
                multiline
                rows={6}
                placeholder="Add your job description..."
                sx={{
                  width: "100%",
                  marginTop: "8px",
                  "& .css-xrmkj5-MuiInputBase-root-MuiOutlinedInput-root": {
                    padding: "12px 18px",
                  },
                }}
                {...register("description")}
              />
            ) : (
              <p className="text-wrap w-70 text-ellipsis break-all h-fit">
                {job.description ? job.description : "No data"}
              </p>
            )}

            {errors.description && <p>{errors.description?.message}</p>}
          </div>

          <div className="flex flex-col gap-2 not-first:mt-2">
            <label>
              <b>Responsibilities: </b>
            </label>
            {updateMode ? (
              <TextField
                id="standard-multiline-static"
                multiline
                rows={6}
                placeholder="Add your job responsibilities..."
                sx={{
                  width: "100%",
                  marginTop: "8px",
                  "& .css-xrmkj5-MuiInputBase-root-MuiOutlinedInput-root": {
                    padding: "12px 18px",
                  },
                }}
                {...register("responsibilities")}
              />
            ) : (
              <p className="text-wrap w-70 text-ellipsis break-all h-fit">
                {job.responsibilities ? job.responsibilities : "No data"}
              </p>
            )}

            {errors.responsibilities && (
              <p>{errors.responsibilities?.message}</p>
            )}
          </div>

          <Buttons
            deleteJobMutation={deleteJobMutation}
            setUpdateMode={setUpdateMode}
            updateMode={updateMode}
          />
        </form>
      ) : (
        <p>No data</p>
      )}
    </DashboardSection>
  );
};

export default Job;
