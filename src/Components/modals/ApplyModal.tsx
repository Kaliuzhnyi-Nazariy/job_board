import { Box, MenuItem, Modal, Select, TextField } from "@mui/material";
import { useMutation, useQuery } from "@tanstack/react-query";

import { applyToJob } from "../../../features/application/applicationRequest";
import { Controller, useForm, type SubmitHandler } from "react-hook-form";
import { errorToast, successToast } from "../Toasts/Toasts";
import { getCVs } from "../../../features/cv/requests";
import type { ICV } from "../../../features/cv/interfaces";

export interface ApplyState {
  coveringLetter: string;
  cvId: string;
}

const ApplyModal = ({
  open,
  handleClose,
  jobId,
  jobTitle,
}: {
  open: boolean;
  handleClose: () => void;
  jobId: string;
  jobTitle: string;
}) => {
  const defaultValue: ApplyState = {
    coveringLetter: "",
    cvId: "",
  };

  const { register, handleSubmit, reset, control, watch } = useForm({
    defaultValues: defaultValue,
  });

  const { cvId } = watch();

  const { mutate, isPending } = useMutation({
    mutationKey: ["applyToJob"],
    mutationFn: (data: ApplyState) =>
      applyToJob({
        jobId: jobId!,
        coveringLetter: data.coveringLetter,
        cvId: data.cvId,
      }),
    onSuccess: () => {
      handleClose();
      successToast({ text: "You successfully applied!" });
      reset({ coveringLetter: "" });
    },
    onError: (error) => {
      errorToast({ text: (error as { message: string }).message });
    },
  });

  const handleApplySubmit: SubmitHandler<ApplyState> = (data) => {
    mutate(data);
  };

  const { data: cvs } = useQuery({
    queryKey: ["getCVs"],
    queryFn: () => getCVs(),
  });

  return (
    <Modal open={open} onClose={handleClose} aria-labelledby="apply-modal">
      <Box
        sx={{
          backgroundColor: "#fff",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          p: 2.5,
          borderRadius: "12px",
          width: "300px",
          "@media (min-width: 640px)": {
            width: "420px",
          },
          "@media (min-width: 1024px)": {
            width: "648px",
          },
        }}
      >
        <h2 className="body_large_500">Apply Job: {jobTitle}</h2>
        <form onSubmit={handleSubmit(handleApplySubmit)}>
          <>
            <p className="mt-4 body_small">Choose Resume</p>
            {cvs && cvs.length > 0 ? (
              <Controller
                name="cvId"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <Select
                    {...field}
                    displayEmpty
                    sx={{ width: "100%", marginTop: "8px" }}
                  >
                    <MenuItem value="">
                      <em>Select your CV</em>
                    </MenuItem>

                    {cvs.map((cv: ICV) => (
                      <MenuItem key={cv.id} value={cv.id}>
                        {cv.filename}
                      </MenuItem>
                    ))}
                  </Select>
                )}
              />
            ) : (
              <p>You don't have CVs!</p>
            )}
          </>
          <>
            <p className="body_small mt-4">Cover Letter</p>
            <TextField
              id="standard-multiline-static"
              multiline
              rows={6}
              placeholder="Write down your biography here. Let the employers know who you are..."
              sx={{
                width: "100%",
                marginTop: "8px",
              }}
              {...register("coveringLetter")}
            />
          </>

          {isPending ? (
            "Loading..."
          ) : (
            <ul className="flex w-full justify-between items-center mt-4">
              <li>
                <button
                  type="button"
                  onClick={handleClose}
                  className="cursor-pointer px-6 py-3 bg-(--primary50) button text-(--primary5) hover:text-(--primary6) hover:bg-(--primary1) rounded-[3px] transition-colors duration-150"
                >
                  Cancel
                </button>
              </li>
              <li>
                <button
                  className="cursor-pointer px-6 py-3 bg-(--primary5) button text-white hover:bg-(--primary6) rounded-[3px] transition-colors duration-150 disabled:opacity-50"
                  disabled={!cvId}
                >
                  Apply Now
                </button>
              </li>
            </ul>
          )}
        </form>
      </Box>
    </Modal>
  );
};

export default ApplyModal;
