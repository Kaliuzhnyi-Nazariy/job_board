import api from "../api/api";
import { errorWrapper } from "../helper";

const getCVs = async () => {
  const res = await api.get("/cv");
  return res.data;
};

const uploadCV = async (cv: File, filename: string) => {
  const formData = new FormData();

  formData.append("resume", cv);
  formData.append("filename", filename);

  return await api.post("/cv", formData);
};

const deleteCV = async (cvId: string) => {
  return await api.delete("/cv/" + cvId);
};

const updateCV = async ({
  cv,
  cvId,
  filename,
  newFilename,
}: {
  cv: File;
  cvId: string;
  filename: string;
  newFilename: string;
}) => {
  const formData = new FormData();

  formData.append("resume", cv);
  formData.append("filename", filename);
  formData.append("newFilename", newFilename);

  return await api.put("/cv/" + cvId, formData);
};

const getPresignedLink = async (cvId: string) => {
  const res = await api.get("/cv/" + cvId + "/download");
  return res.data;
};

export default {
  getCVs: errorWrapper(getCVs),
  uploadCV: errorWrapper(uploadCV, "Failed to upload CV!"),
  deleteCV: errorWrapper(deleteCV, "Failed to delete CV!"),
  updateCV: errorWrapper(updateCV, "Failed to update CV!"),
  getPresignedLink: errorWrapper(getPresignedLink),
};
