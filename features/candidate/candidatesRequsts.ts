import api from "../api/api";
import { errorWrapper } from "../helper";
import type {
  IDefaultContactForm,
  IUpdForm,
  UpdateProfile,
} from "./interfaces";

const getCandidates = async (
  limit: number,
  search?: string,
  location?: string,
  order?: "DESC" | "ASC",
) => {
  const res = await api.get("/candidate", {
    params: { search, location, order, limit },
  });

  return res.data;
};

const getCandidate = async (id: string) => {
  const res = await api.get("/candidate/" + id);

  return res.data.data;
};

const updateCandidatePersonal = async (data: IUpdForm & { id: string }) => {
  const res = await api.patch("candidate/update-personal", data);

  return res.data;
};

const updateCandidateProfile = async (data: UpdateProfile) => {
  const res = await api.patch("candidate/update-profile", data);

  return res.data;
};

const updateContact = async (data: IDefaultContactForm) => {
  const res = await api.patch("candidate/update-contact", data);
  return res.status;
};

export default {
  getCandidates: errorWrapper(getCandidates),
  getCandidate: errorWrapper(getCandidate),
  updateCandidatePersonal: errorWrapper(updateCandidatePersonal),
  updateCandidateProfile: errorWrapper(updateCandidateProfile),
  updateContact: errorWrapper(updateContact),
};
