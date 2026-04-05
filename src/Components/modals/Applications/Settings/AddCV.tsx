import { Box, Modal, TextField } from "@mui/material";
import CustomButton from "../../../Buttons/Button";
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";
import { Controller, useForm, type SubmitHandler } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { uploadCV } from "../../../../../features/cv/requests";
import { errorToast, successToast } from "../../../Toasts/Toasts";

const AddCV = ({
  open,
  handleClose,
}: {
  open: boolean;
  handleClose: () => void;
}) => {
  interface ICVForm {
    name: string;
    file: File | null;
  }

  const {
    register,
    handleSubmit,
    watch,
    control,
    setValue,
    reset,
    formState: { isValid },
  } = useForm<ICVForm>({ mode: "all" });

  const queryClient = useQueryClient();

  const { mutate: uploadCVMutation, isPending: uploadLoading } = useMutation({
    mutationKey: ["uploadCV"],
    mutationFn: (data: { file: File; name: string }) =>
      uploadCV(data.file, data.name),
    onError: (err) => errorToast({ text: err.message }),
    onSuccess: () => {
      successToast({ text: "CV uploaded successfully!" });
      handleClose();
      queryClient.invalidateQueries({ queryKey: ["getCVs"] });
      reset({ file: null, name: "" });
    },
  });

  const submitHandle: SubmitHandler<ICVForm> = async (data) => {
    if (!data.file) return;
    uploadCVMutation(data as { file: File; name: string });
  };

  const chosenFile = watch("file");

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
        <p className="body_large_500 uppercase">Add Cv/Resume</p>
        <form
          onSubmit={handleSubmit(submitHandle)}
          className="w-full flex flex-col gap-4.5 mt-4.5"
        >
          <div className="flex flex-col gap-2 w-full">
            <label htmlFor="cv_name" className="body_small">
              CV/Resume Name
            </label>
            <TextField
              id="outlined-basic cv_name"
              variant="outlined"
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
          <div className="flex flex-col gap-2">
            <label htmlFor="cv_file" className="body_small">
              Upload your Cv/Resume
            </label>

            <Controller
              name="file"
              control={control}
              rules={{ required: "File is required" }}
              render={({ field }) => (
                <>
                  {chosenFile ? (
                    <div className="p-5 rounded-md border border-(--gray3) flex justify-between items-center">
                      <p className="body_small_500 overflow-hidden">
                        {chosenFile.name}
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

            {/* <input
              type="file"
              className="hidden"
              id="file-input"
              {...register("file", { required: true })}
              accept=".pdf"
            />
            <label
              htmlFor="file-input"
              className="px-8 py-6 border-2 border-dashed border-(--gray2) rounded-md text-center items-center gap-3"
            >
              <CloudUploadOutlinedIcon
                sx={{ fontSize: "48px" }}
                className=" text-(--gray3) "
              />
              <div className="flex flex-col gap-2.5">
                <b>Browse File</b>
                <p className="body_small text-(--gray6)">
                  Browse file or drop here. only pdf
                </p>
              </div>
            </label> */}
          </div>
          {uploadLoading ? (
            <p>Loading</p>
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
                  Add CV/Resume
                </CustomButton>
              </li>
            </ul>
          )}
        </form>
      </Box>
    </Modal>
  );
};

export default AddCV;
