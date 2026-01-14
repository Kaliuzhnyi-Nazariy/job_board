import type {
  IGetJob,
  IJobForm,
  // IJobFormUpdate
} from "./interfaces";
import api from "../api/api";

export const postJob = async (data: IJobForm) => {
  const res = await api.post("/job/post", {
    ...data,
    salary: `$${data.minSalary}-$${data.maxSalary}/${data.salaryType}`,
  });

  return res.data;
};

export const getJobs = async (params: IGetJob) => {
  const res = await api.get("/job/jobs", {
    params,
  });

  return res.data;
};

export const getMyJobs = async () => {
  const res = await api.get("/job/my-jobs");

  return res.data;
};

export const getMyJob = async (jobId: string) => {
  const res = await api.get("/job/my-jobs/" + jobId);

  return res.data;
};

export const updateMyJob = async ({
  data,
  jobId,
}: {
  data: IJobForm;
  jobId: string;
}) => {
  const salary = `$${data.minSalary}-$${data.maxSalary}/${data.salaryType}`;
  const res = await api.put(`/job/update/${jobId}`, {
    ...data,
    salary,
  });

  return res.data;
};

export const getJob = async (jobId: string) => {
  const res = await api.get("/job/jobs/" + jobId);

  return res.data;
};
