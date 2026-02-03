import {
  Box,
  MenuItem,
  Modal,
  Select,
  // TextareaAutosize,
  TextField,
  // Typography,
} from "@mui/material";
import { useMutation } from "@tanstack/react-query";

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
        <h2 className="body_large_500">Apply Job: {jobTitle}</h2>
        <form onSubmit={handleSubmit(handleApplySubmit)}>
          <>
            <p className="mt-4 body_small">Choose Resume</p>
            <Select
              // labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={"Select..."}
              // label="Select..."
              sx={{ width: "100%", marginTop: "8px" }}

              // onChange={handleChange}
            >
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
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
                // padding: "12px 18px",
                marginTop: "8px",
                // "& .css-m1j2os-MuiFormControl-root-MuiTextField-root": {
                //   padding: "0px",
                // },
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
                <button className="cursor-pointer px-6 py-3 bg-(--primary5) button text-white hover:bg-(--primary6) rounded-[3px] transition-colors duration-150">
                  Apply Now
                </button>
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
