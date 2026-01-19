import api from "../api/api";
import type { CandidateApplication } from "./interfaces";

export const apply = async ({
  jobId,
  coveringLetter,
}: {
  jobId: string;
  coveringLetter?: string;
}) => {
  const res = await api.post("/application/" + jobId, { coveringLetter });

  return res.data;
};

export const getCandidateApplications = async (): Promise<
  CandidateApplication[]
> => {
  const res = await api.get("/application/candidate-applications");

  return res.data;
};

export const getCandidateApplicationDetails = async (
  jobApplicationId: string,
) => {
  const res = await api.get(
    "/application/candidate-applications/" + jobApplicationId,
  );

  return res.data;
};

export const getApplications = async (jobId: string) => {
  const res = await api.get("/application/get-applications/" + jobId);

  return res.data;
};

export const getApplicantDetails = async (
  jobId: string,
  applicationId: string,
) => {
  const res = await api.get(
    `/application/${jobId}/candidate-details/${applicationId}`,
  );

  return res.data;
};
