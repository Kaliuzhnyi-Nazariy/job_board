import api from "../api/api";
import type { IUpdForm, UpdateProfile } from "./interfaces";

export const getCandidates = async (search?: string, location?: string) => {
  const res = await api.get("/candidate", {
    params: { search, location },
  });

  return res.data;
};

export const getCandidate = async (id: string) => {
  const res = await api.get("/candidate/" + id);

  return res.data.data;
};

export const updateCandidatePersonal = async (
  data: IUpdForm & { id: string },
) => {
  const res = await api.patch("candidate/update-personal", data);

  return res.data;
};

export const updateCandidateProfile = async (data: UpdateProfile) => {
  const res = await api.patch("candidate/update-profile", data);

  return res.data;
};
