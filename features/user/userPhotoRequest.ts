import api from "../api/api";

export const uploadUserPhotoRequest = async (file: File) => {
  const formData = new FormData();

  formData.append("photo", file);

  const res = await api.patch("/user/photo", formData);

  return res.data;
};

export const deleteUserPhoto = async () => {
  const res = await api.delete("/user/photo");

  return res.data;
};
