import { Box, Modal } from "@mui/material";
import InsertPhotoOutlinedIcon from "@mui/icons-material/InsertPhotoOutlined";
import CustomButton from "../../../Buttons/Button";
import { useState } from "react";
import { errorToast, successToast } from "../../../Toasts/Toasts";
import { useMutation } from "@tanstack/react-query";

import {
  deleteUserPhoto,
  uploadUserPhotoRequest,
} from "../../../../../features/user/userPhotoRequest";
import { useAppDispatch } from "../../../../../features/hooks/dispatchHook";
import { getMe } from "../../../../../features/user/userRequest";

const PersonalPhotoModal = ({
  open,
  handleClose,
  isUserHasPhoto,
}: {
  open: boolean;
  handleClose: () => void;
  isUserHasPhoto: boolean;
}) => {
  const [photoFile, setPhotoFile] = useState<null | File>(null);

  const dispatch = useAppDispatch();

  const { mutate: uploadPhoto, isPending: uploadingLoading } = useMutation({
    mutationKey: ["uploadPhoto"],
    mutationFn: () => uploadUserPhotoRequest(photoFile!),
    onError: (err) => {
      errorToast({ text: err.message });
    },
    onSuccess: async () => {
      successToast({ text: "Photo is uploaded!" });
      await dispatch(getMe());
      handleClose();
    },
  });

  const { mutate: deletePhoto, isPending: deletingLoading } = useMutation({
    mutationKey: ["deletePhoto"],
    mutationFn: () => deleteUserPhoto(),
    onError: (err) => {
      errorToast({ text: err.message });
    },
    onSuccess: async () => {
      successToast({ text: "Photo is deleted!" });
      await dispatch(getMe());
      handleClose();
    },
  });

  const settingPhotoFn = (e: File) => {
    if (!e.type.startsWith("image/")) {
      errorToast({ text: "File must be photo!" });
      return;
    } else if (e.size > 1 * 1024 * 1024) {
      errorToast({ text: "Photo must be less than 1MB!" });
      return;
    } else {
      setPhotoFile(e);
    }
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          backgroundColor: "#fff",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          p: 2.5,
          borderRadius: "12px",

          display: "flex",
          flexDirection: "column",
          alignItems: "center",

          width: "80%",
          "@media (min-width: 768px)": {
            width: "50%",
          },
        }}
      >
        <form
          className="inline-block w-full"
          onSubmit={(e) => {
            e.preventDefault();
            uploadPhoto();
          }}
        >
          <label
            htmlFor="fileInput"
            className={`flex flex-col items-center justify-center gap-4 mx-auto border border-dashed rounded-md size-50 cursor-pointer ${
              photoFile ? "group relative" : ""
            }`}
          >
            {photoFile ? (
              <>
                <img
                  src={URL.createObjectURL(photoFile)}
                  alt="preview"
                  className="mx-auto max-w-30"
                />

                <div className="absolute inset-0 hidden group-hover:flex items-center justify-center bg-black/40 text-white">
                  <InsertPhotoOutlinedIcon />
                  <span>Change photo</span>
                </div>
                <input
                  id="fileInput"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => settingPhotoFn(e.target.files![0])}
                />
              </>
            ) : (
              <>
                <div className="flex flex-col items-center">
                  <InsertPhotoOutlinedIcon />
                  <span>Upload photo</span>
                </div>
                <input
                  id="fileInput"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => settingPhotoFn(e.target.files![0])}
                />
              </>
            )}
          </label>

          <ul
            className={
              "grid mt-6 " +
              (isUserHasPhoto
                ? "grid-cols-2 grid-rows-auto gap-y-3 min-[768px]:grid-cols-3"
                : "grid-cols-2")
            }
          >
            <li className="justify-self-center">
              <CustomButton
                type="outlined"
                onClick={handleClose}
                disabled={uploadingLoading}
              >
                Close
              </CustomButton>
            </li>
            <li
              className={
                "justify-self-center min-[768px]:col-start-2  min-[768px]:row-start-1 max-[767px]:w-full " +
                (isUserHasPhoto && "col-start-1 col-end-3 row-start-2")
              }
            >
              <CustomButton
                disabled={!photoFile || uploadingLoading}
                loading={uploadingLoading}
                extraStyles=" max-[767px]:w-full"
              >
                Update
              </CustomButton>
            </li>
            {isUserHasPhoto && (
              <li className="justify-self-center">
                <CustomButton
                  type="delete"
                  onClick={deletePhoto}
                  buttonType="button"
                  loading={deletingLoading}
                >
                  Delete
                </CustomButton>
              </li>
            )}
          </ul>
        </form>
      </Box>
    </Modal>
  );
};

export default PersonalPhotoModal;
