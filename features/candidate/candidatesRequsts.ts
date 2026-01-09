import api from "../api/api";

export const getCandidates = async () => {
  const res = await api.get("/candidate");

  return res.data;
};
