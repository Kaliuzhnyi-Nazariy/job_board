import api from "../api/api";

export const getCandidates = async () => {
  const res = await api.get("/candidate");

  return res.data;
};

export const getCandidate = async (id: string) => {
  const res = await api.get("/candidate/" + id);

  return res.data.data;
};
