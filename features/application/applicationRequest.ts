import api from "../api/api";

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

export const getCandidateApplications = async () => {
  const res = await api.get("/application/candidate-applications");

  return res.data;
};
