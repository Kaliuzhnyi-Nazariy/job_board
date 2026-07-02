import api from "../api/api";
import { errorWrapper } from "../helper";
import type { CandidateApplication } from "./interfaces";

const applyToJob = async ({
  jobId,
  coveringLetter,
  cvId,
}: {
  jobId: string;
  coveringLetter?: string;
  cvId: string;
}) => {
  const res = await api.post("/application/" + jobId, { coveringLetter, cvId });

  return res.data;
};

const getApplicantDetails = async (jobId: string, applicationId: string) => {
  const res = await api.get(
    `/application/${jobId}/candidate-details/${applicationId}`,
  );

  return res.data;
};

const getCandidateCountApplications = async () => {
  const res = await api.get("/application/my/count");

  return res.data;
};

const getCandidateApplications = async (
  page?: string | null,
): Promise<CandidateApplication[]> => {
  const res = await api.get("/application/my", {
    params: { page },
  });

  return res.data;
};

const getCandidateRecentApplications = async () => {
  const res = await api.get("/application/my/recent");

  return res.data;
};

// employer

const getCandidateApplicationDetails = async (jobApplicationId: string) => {
  const res = await api.get("/application/my/" + jobApplicationId);

  return res.data;
};

const getApplications = async (jobId: string) => {
  const res = await api.get("/application/" + jobId);

  return res.data;
};

const updateApplicationStatus = async (
  jobApplicationId: string,
  status: "rejected" | "accepted",
) => {
  const res = await api.patch("/application/" + jobApplicationId + "/status", {
    status,
  });

  return res.data;
};

export default {
  applyToJob: errorWrapper(applyToJob, "Failed to submit application!"),
  getApplicantDetails: errorWrapper(getApplicantDetails),
  getCandidateCountApplications: errorWrapper(getCandidateCountApplications),
  getCandidateApplications: errorWrapper(getCandidateApplications),
  getCandidateRecentApplications: errorWrapper(getCandidateRecentApplications),
  getCandidateApplicationDetails: errorWrapper(getCandidateApplicationDetails),
  getApplications: errorWrapper(getApplications),
  updateApplicationStatus: errorWrapper(
    updateApplicationStatus,
    "Failed to update application status!",
  ),
};
