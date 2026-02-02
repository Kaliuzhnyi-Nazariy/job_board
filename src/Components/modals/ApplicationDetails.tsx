// TO-DO: Date and work_time view functions

import { Box, Modal, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { getCandidateApplicationDetails } from "../../../features/application/applicationRequest";
import { workTimeFormat } from "../../helpers/jobTimeFormat";
import { dateFormat } from "../../helpers";

const ApplicationDetails = ({
  open,
  handleClose,
  applicationId,
}: {
  open: boolean;
  handleClose: () => void;
  applicationId: string;
}) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["getApplicationDetails", applicationId],
    queryFn: () => getCandidateApplicationDetails(applicationId),
    enabled: !!applicationId,
    retry: 1,
  });

  if (!data) {
    return null;
  }

  // if (!isLoading && !isError) {
  //   dateFormat(data.applied_at || undefined);
  // }

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
          width: "80%",
        }}
      >
        {isLoading ? (
          <Typography>Loading...</Typography>
        ) : isError ? (
          <>
            <Typography>Error occured!</Typography>
            <button onClick={handleClose} className="cursor-pointer">
              Close
            </button>
          </>
        ) : (
          <>
            <div className="flex gap-2 items-center">
              <Typography variant="h6" component="h2">
                Title: {data.title}
              </Typography>
              <Typography component="p">
                {workTimeFormat(data.work_time)}
              </Typography>
            </div>
            <Typography component="p">Position: {data.position}</Typography>
            <Typography component="p">Location: {data.location}</Typography>
            <div>
              <Typography component="h6">Description</Typography>
              <Typography component="article">{data.description}</Typography>
            </div>
            <div>
              <Typography component="h6">Responsibilites</Typography>
              <Typography component="article">
                {data.responsibilities || "No responsibilities"}
              </Typography>
            </div>
            <hr />
            <>
              <Typography component="h6">Covering Letter</Typography>
              <Typography component="article">
                {data.covering_letter || "No covering letter"}
              </Typography>
            </>
            <>
              <Typography component="p">Status: {data.status}</Typography>
            </>
            <>
              <Typography component="p">
                Applied: {dateFormat(data.applied_at)}
              </Typography>
            </>
            <button onClick={handleClose}>Close</button>
          </>
        )}
      </Box>
    </Modal>
  );
};

export default ApplicationDetails;
