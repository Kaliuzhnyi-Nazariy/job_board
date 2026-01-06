import type { IJobForm } from "./interfaces";
import api from "../api/api";

export const postJob = async (data: IJobForm) => {
  const res = await api.post("/job/post", {
    ...data,
    salary: `$${data.minSalary}-$${data.maxSalary}/${data.salaryType}`,
  });

  return res.data;
};
