import { Box, Modal, TextField } from "@mui/material";
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";
import CustomButton from "../../../Buttons/Button";
import { useForm, type SubmitHandler } from "react-hook-form";
import type { ICV } from "../../../../../features/cv/interfaces";
import { useEffect } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCV } from "../../../../../features/cv/requests";
import { errorToast, successToast } from "../../../Toasts/Toasts";

import { Controller } from "react-hook-form";

const UpdateCV = ({
  open,
  handleClose,
  selectedCV,
}: {
  open: boolean;
  handleClose: () => void;
  selectedCV: ICV;
}) => {
  interface ICVForm {
    name: string;
    file: File | null;
  }

  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { isValid },
    reset,
  } = useForm<ICVForm>({
    mode: "onChange",
    defaultValues: {
      name: "",
      file: null,
    },
  });

  interface IUpdCV {
    name: string;
    file: File;
  }

  const queryClient = useQueryClient();

  const { mutate: udpateCV, isPending: updatingLoading } = useMutation({
    mutationKey: ["updateCV"],
    mutationFn: (data: IUpdCV) =>
      updateCV({
        cv: data.file,
        cvId: selectedCV.id,
        filename: selectedCV.filename,
        newFilename: data.name,
      }),

    onSuccess: () => {
      successToast({ text: "CV updated successfully!" });
      handleClose();
      queryClient.invalidateQueries({ queryKey: ["getCVs"] });
      reset({ file: null, name: "" });
    },
    onError: (err) => {
      errorToast({ text: err.message });
    },
  });

  const submitHandle: SubmitHandler<ICVForm> = async (data) => {
    if (!selectedCV) return;
    if (!data.file) return;
    udpateCV(data as IUpdCV);
  };

  useEffect(() => {
    reset({
      name: selectedCV?.filename.split(".")[0],
    });
  }, [reset, selectedCV?.filename]);

  const selectedFile = watch("file");

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
        <p className="body_large_500 uppercase">update Cv/Resume</p>
        <form
          className="w-full flex flex-col gap-4.5 mt-4.5"
          onSubmit={handleSubmit(submitHandle)}
        >
          <div className="flex flex-col gap-2 w-full">
            <label htmlFor="cv_name" className="body_small">
              CV/Resume Name
            </label>
            <TextField
              id="outlined-basic cv_name"
              variant="outlined"
              // {...register("username")}
              // placeholder="Username"
              sx={{
                height: "48px",
                width: "100%",
                padding: 0,
              }}
              InputProps={{
                sx: {
                  height: "48px",
                  "& .css-16wblaj-MuiInputBase-input-MuiOutlinedInput-input": {
                    padding: "12px 18px",
                  },
                },
              }}
              {...register("name", { required: true })}
            />
          </div>

          <Controller
            name="file"
            control={control}
            rules={{ required: "File is required" }}
            render={({ field }) => (
              <>
                {selectedFile ? (
                  <div className="p-5 rounded-md border border-(--gray3) flex justify-between items-center">
                    <p className="body_small_500 overflow-hidden">
                      {selectedFile.name}
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        setValue("file", null, { shouldValidate: true });
                      }}
                    >
                      X
                    </button>
                  </div>
                ) : (
                  <>
                    <input
                      type="file"
                      accept="application/pdf"
                      hidden
                      id="file-input"
                      onChange={(e) => {
                        const file = e.target.files?.[0] ?? null;
                        field.onChange(file);
                      }}
                    />
                    <label
                      htmlFor="file-input"
                      className="px-8 py-6 border-2 border-dashed border-(--gray2) rounded-md text-center items-center gap-3"
                    >
                      <CloudUploadOutlinedIcon
                        sx={{ fontSize: "48px" }}
                        className=" text-(--gray3)"
                      />
                      <div className="flex flex-col gap-2.5">
                        <b>Browse File</b>
                        <p className="body_small text-(--gray6)">
                          Browse file or drop here. only pdf
                        </p>
                      </div>
                    </label>
                  </>
                )}
              </>
            )}
          />

          {updatingLoading ? (
            <p>Loading...</p>
          ) : (
            <ul className="flex flex-col-reverse gap-2 min-[640px]:flex-row w-full justify-between mt-6">
              <li>
                <CustomButton
                  onClick={handleClose}
                  type="pale"
                  buttonType="button"
                  extraStyles=" max-[767px]:w-full"
                >
                  Cancel
                </CustomButton>
              </li>
              <li>
                <CustomButton
                  buttonType="submit"
                  extraStyles=" max-[767px]:w-full"
                  disabled={!isValid}
                >
                  Update CV/Resume
                </CustomButton>
              </li>
            </ul>
          )}
        </form>
      </Box>
    </Modal>
  );
};

export default UpdateCV;
