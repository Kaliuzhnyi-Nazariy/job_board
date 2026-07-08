import api from "../api/api";
import { errorWrapper } from "../helper";

const uploadUserPhotoRequest = async (file: File) => {
  const formData = new FormData();

  formData.append("photo", file);

  const res = await api.patch("/user/photo", formData);

  return res.data;
};

const deleteUserPhoto = async () => {
  const res = await api.delete("/user/photo");

  return res.data;
};

export default {
  uploadUserPhotoRequest: errorWrapper(uploadUserPhotoRequest),
  deleteUserPhoto: errorWrapper(deleteUserPhoto),
};
