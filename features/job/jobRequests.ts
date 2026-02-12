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

export const getMyJobs = async (page: number) => {
  const res = await api.get("/job/my-jobs", {
    params: { page },
  });

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

// export const getJobById = async (jobId: string) => {
export const getJob = async (jobId: string) => {
  const res = await api.get("/job/jobs/" + jobId);

  return res.data;
};

export const getFiveRecentJobs = async () => {
  const res = await api.get("/job/my-jobs/five-recent");

  return res.data;
};

export const getRecentJobs = async (page: string) => {
  const res = await api.get("/job/my-jobs/recent", {
    params: {
      page,
    },
  });

  return res.data;
};

export const deleteJob = async (jobId: string) => {
  const res = await api.delete("/job/delete/" + jobId);

  return res.data;
};
