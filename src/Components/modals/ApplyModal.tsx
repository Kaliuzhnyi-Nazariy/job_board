import {
  Box,
  MenuItem,
  Modal,
  Select,
  TextareaAutosize,
  Typography,
} from "@mui/material";
import { useMutation } from "@tanstack/react-query";
// import React from "react";
// import Modal from "./Modal";
import { apply } from "../../../features/application/applicationRequest";
import { useForm, type SubmitHandler } from "react-hook-form";

export interface ApplyState {
  coveringLetter: string;
  // CV: string;
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
  };

  const { register, handleSubmit } = useForm({
    defaultValues: defaultValue,
  });

  const { mutate, isPending } = useMutation({
    mutationKey: ["apply"],
    mutationFn: (data: ApplyState) =>
      apply({ jobId: jobId!, coveringLetter: data.coveringLetter }),
    onSuccess: () => handleClose(),
  });

  const handleApplySubmit: SubmitHandler<ApplyState> = (data) => {
    mutate(data);
  };

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
          width: "648px",
        }}
      >
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Apply Job: {jobTitle}
        </Typography>
        <form onSubmit={handleSubmit(handleApplySubmit)}>
          <>
            <Typography>Choose Resume</Typography>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={"Select..."}
              label="Select..."
              sx={{ width: "100%" }}
              // onChange={handleChange}
            >
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </>
          <>
            <Typography>Cover Letter</Typography>
            <TextareaAutosize
              minRows={3}
              placeholder="Write down your biography here. Let the employers know who you are..."
              style={{ width: "100%", padding: "12px 18px" }}
              {...register("coveringLetter")}
            />
          </>

          {isPending ? (
            "Loading..."
          ) : (
            <ul className="flex w-full justify-between items-center">
              <li>
                <button
                  type="button"
                  onClick={handleClose}
                  className="cursor-pointer"
                >
                  Cancel
                </button>
              </li>
              <li>
                <button className="cursor-pointer">Apply Now</button>
              </li>
            </ul>
          )}
        </form>
      </Box>
    </Modal>
  );
  //   return <Modal>Hello</Modal>;
};

export default ApplyModal;
