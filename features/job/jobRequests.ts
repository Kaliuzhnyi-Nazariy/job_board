import type { IGetJob, IJobForm } from "./interfaces";
import api from "../api/api";
import axios from "axios";
import { errorWrapper } from "../helper";

const postJob = async (data: IJobForm) => {
  try {
    const res = await api.post("/job/post", {
      ...data,
      salary: `$${data.minSalary}-$${data.maxSalary}/${data.salaryType}`,
    });

    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const backendMessage = (error.response?.data as { message?: string })
        ?.message;

      throw new Error(backendMessage || "Job hasn't been created!");
    }

    throw error;
  }
};

const getJobs = async (params: IGetJob) => {
  const res = await api.get("/job/jobs", {
    params,
  });

  return res.data;
};

const getMyJobs = async (page: number) => {
  const res = await api.get("/job/my-jobs", {
    params: { page },
  });

  return res.data;
};

const getMyJob = async (jobId: string) => {
  const res = await api.get("/job/my-jobs/" + jobId);

  return res.data;
};

const updateMyJob = async ({
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

const getJob = async (jobId: string) => {
  const res = await api.get("/job/jobs/" + jobId);

  return res.data;
};

const getFiveRecentJobs = async () => {
  const res = await api.get("/job/my-jobs/five-recent");

  return res.data;
};

const getRecentJobs = async (page: string) => {
  const res = await api.get("/job/my-jobs/recent", {
    params: {
      page,
    },
  });

  return res.data;
};

const deleteJob = async (jobId: string) => {
  const res = await api.delete("/job/delete/" + jobId);

  return res.data;
};

export default {
  postJob: errorWrapper(postJob),
  getMyJobs: errorWrapper(getMyJobs),
  getMyJob: errorWrapper(getMyJob),
  updateMyJob: errorWrapper(updateMyJob),
  getJob: errorWrapper(getJob),
  getJobs: errorWrapper(getJobs),
  getFiveRecentJobs: errorWrapper(getFiveRecentJobs),
  getRecentJobs: errorWrapper(getRecentJobs),
  deleteJob: errorWrapper(deleteJob),
};
