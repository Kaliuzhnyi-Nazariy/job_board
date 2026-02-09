import api from "../api/api";
import type { CandidateApplication } from "./interfaces";

export const applyToJob = async ({
  jobId,
  coveringLetter,
}: {
  jobId: string;
  coveringLetter?: string;
}) => {
  const res = await api.post("/application/" + jobId, { coveringLetter });

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

export const getCandidateCountApplications = async () => {
  const res = await api.get("/application/my/count");

  return res.data;
};

export const getCandidateApplications = async (
  page?: string | null,
): Promise<CandidateApplication[]> => {
  const res = await api.get("/application/my", {
    params: { page },
  });

  return res.data;
};

export const getCandidateRecentApplications = async () => {
  const res = await api.get("/application/my/recent");

  return res.data;
};

// employer

export const getCandidateApplicationDetails = async (
  jobApplicationId: string,
) => {
  const res = await api.get(
    "/application/my/" + jobApplicationId,
    // "/application/candidate-applications/" + jobApplicationId,
  );

  return res.data;
};

export const getApplications = async (jobId: string) => {
  const res = await api.get("/application/" + jobId);

  return res.data;
};

export const updateApplicationStatus = async (
  jobApplicationId: string,
  status: "rejected" | "accepted",
) => {
  const res = await api.patch("/application/" + jobApplicationId + "/status", {
    status,
  });

  return res.data;
};
