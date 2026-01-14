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
