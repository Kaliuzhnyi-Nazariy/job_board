import api from "../api/api";

export const getCVs = async () => {
  const res = await api.get("/cv");
  return res.data;
};

export const uploadCV = async (cv: File, filename: string) => {
  const formData = new FormData();

  formData.append("resume", cv);
  formData.append("filename", filename);

  return await api.post("/cv", formData);
};

export const deleteCV = async (cvId: string) => {
  return await api.delete("/cv/" + cvId);
};

export const updateCV = async ({
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

export const getPresignedLink = async (cvId: string) => {
  const res = await api.get("/cv/" + cvId + "/download");
  return res.data;
};
