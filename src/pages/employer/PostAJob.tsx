// TO-DO:
// error handling from tanstack
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";

import { useForm, type SubmitHandler } from "react-hook-form";
import { type IJobForm } from "../../../features/job/interfaces";
import { postJob } from "../../../features/job/jobRequests";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import DashboardSection from "../../Components/Dashboard/DashboardSection";
import { MenuItem, Select, TextField } from "@mui/material";

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
        'That field can be filled only with that values: "month", "week", "year", "contract"',
      ),
      workTime: z.enum(
        ["full_time", "part_time", "internship", "contract"],
        "That field can be filled only with that values: 'full_time', 'part_time', 'internship', 'contract' ",
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
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: JobForm,
    resolver: zodResolver(jobValidation),
  });

  const mutation = useMutation({
    mutationFn: (data: IJobForm) => postJob(data),
    onSuccess: () =>
      reset({
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
      }),
  });

  const submitHandler: SubmitHandler<IJobForm> = async (data) => {
    mutation.mutate(data);
  };

  console.log({ errors });

  const inputBlock = "flex flex-col";

  return (
    <DashboardSection>
      <h5>Post a job</h5>
      <form onSubmit={handleSubmit(submitHandler)} className="mt-8">
        <div className={inputBlock}>
          <label className="body_small">Job title</label>
          {/* <input type="text" {...register("title")} /> */}

          <TextField
            placeholder="Add job tittle, role, vacancies etc"
            sx={{
              "& .css-16wblaj-MuiInputBase-input-MuiOutlinedInput-input": {
                padding: "12px 18px",
                fontWeight: "400",
                fontSize: "16px",
              },
              "& .css-quhxjy-MuiInputBase-root-MuiOutlinedInput-root": {
                marginTop: "8px",
              },
            }}
            {...register("title")}
          />
        </div>

        <h3
          className="body_large_500"
          style={{ marginTop: "32px", marginBottom: "18px" }}
        >
          Salary
        </h3>

        <div className="grid grid-cols-3 gap-4.5">
          <div className={inputBlock}>
            <label className="body_small">Min Salary</label>
            {/* <input
              type="number"
              {...register("minSalary", { valueAsNumber: true })}
            /> */}
            <TextField
              placeholder="minimum salary..."
              type="number"
              {...register("minSalary", { valueAsNumber: true })}
              sx={{
                "& .css-16wblaj-MuiInputBase-input-MuiOutlinedInput-input": {
                  padding: "12px 18px",
                  fontWeight: "400",
                  fontSize: "16px",
                },
                "& .css-quhxjy-MuiInputBase-root-MuiOutlinedInput-root": {
                  marginTop: "8px",
                },
              }}
            />
          </div>
          <div className={inputBlock}>
            <label className="body_small">Max Salary</label>
            {/* <input
              type="number"
              {...register("maxSalary", { valueAsNumber: true })}
            /> */}
            <TextField
              placeholder="maximum salary..."
              type="number"
              {...register("maxSalary", { valueAsNumber: true })}
              sx={{
                "& .css-16wblaj-MuiInputBase-input-MuiOutlinedInput-input": {
                  padding: "12px 18px",
                  fontWeight: "400",
                  fontSize: "16px",
                },
                "& .css-quhxjy-MuiInputBase-root-MuiOutlinedInput-root": {
                  marginTop: "8px",
                },
              }}
            />
          </div>
          <div className={inputBlock}>
            <label className="body_small">Salary Type</label>
            {/* <input type="text" {...register("salaryType")} /> */}
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
          </div>
        </div>

        <h3
          className="body_large_500"
          style={{ marginTop: "32px", marginBottom: "18px" }}
        >
          Advance Information
        </h3>

        <div className="grid grid-cols-3 gap-4.5">
          <div className={inputBlock}>
            <label className="body_small">Education</label>
            {/* <input type="text" {...register("education")} /> */}
            <TextField
              {...register("education")}
              sx={{
                "& .css-16wblaj-MuiInputBase-input-MuiOutlinedInput-input": {
                  padding: "12px 18px",
                  fontWeight: "400",
                  fontSize: "16px",
                },
                "& .css-quhxjy-MuiInputBase-root-MuiOutlinedInput-root": {
                  marginTop: "8px",
                },
              }}
            />
          </div>
          <div className={inputBlock}>
            <label className="body_small">Experience</label>
            {/* <input type="text" {...register("experience")} /> */}
            <TextField
              {...register("experience")}
              sx={{
                "& .css-16wblaj-MuiInputBase-input-MuiOutlinedInput-input": {
                  padding: "12px 18px",
                  fontWeight: "400",
                  fontSize: "16px",
                },
                "& .css-quhxjy-MuiInputBase-root-MuiOutlinedInput-root": {
                  marginTop: "8px",
                },
              }}
            />
          </div>
          <div className={inputBlock}>
            <label className="body_small">Job Type</label>
            {/* <input type="text" {...register("workTime")} /> */}

            <Select
              defaultValue="full_time"
              {...register("workTime")}
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
              <MenuItem value="full_time">Full-time</MenuItem>
              <MenuItem value="part_time">Part-time</MenuItem>
              <MenuItem value="internship">internship</MenuItem>
              <MenuItem value="contract">contract</MenuItem>
            </Select>
          </div>
          <div className={inputBlock}>
            <label className="body_small">Job level</label>
            {/* <input type="text" {...register("position")} /> */}
            <TextField
              {...register("position")}
              sx={{
                "& .css-16wblaj-MuiInputBase-input-MuiOutlinedInput-input": {
                  padding: "12px 18px",
                  fontWeight: "400",
                  fontSize: "16px",
                },
                "& .css-quhxjy-MuiInputBase-root-MuiOutlinedInput-root": {
                  marginTop: "8px",
                },
              }}
            />
          </div>
          <div className={inputBlock}>
            <label className="body_small">Job location</label>
            {/* <input type="text" {...register("location")} /> */}
            <TextField
              {...register("location")}
              sx={{
                "& .css-16wblaj-MuiInputBase-input-MuiOutlinedInput-input": {
                  padding: "12px 18px",
                  fontWeight: "400",
                  fontSize: "16px",
                },
                "& .css-quhxjy-MuiInputBase-root-MuiOutlinedInput-root": {
                  marginTop: "8px",
                },
              }}
            />{" "}
          </div>
        </div>

        <h3
          className="body_large_500"
          style={{ marginTop: "32px", marginBottom: "18px" }}
        >
          Description & Responsibility
        </h3>

        <div className={inputBlock}>
          <label className="body_small">Description</label>
          {/* <textarea {...register("description")} /> */}
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
        </div>

        <div className={inputBlock + " mt-4.5"}>
          <label className="body_small">Responsibilities</label>
          {/* <textarea {...register("responsibilities")} /> */}
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
        </div>

        <button
          disabled={mutation.isPending}
          className="disabled:opacity-50 px-8 py-4 bg-(--primary5) text-white button cursor-pointer flex gap-3 items-center rounded-sm hover:bg-(--primary6) transition-colors duration-150 mt-8 "
        >
          Post Job <ArrowRightAltIcon />
        </button>
      </form>
    </DashboardSection>
  );
};

export default PostAJob;
