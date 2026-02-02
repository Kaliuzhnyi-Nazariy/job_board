// TO-DO: Date and work_time view functions

import { Box, Modal, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { getCandidateApplicationDetails } from "../../../features/application/applicationRequest";
import { dateFormat } from "../../helpers";
import WorkTimeBadge from "../WorkTimeBadge";

import LocationOnIcon from "@mui/icons-material/LocationOn";

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
            <div className="flex gap-4 items-center">
              <h2 className="body_xl_500 uppercase">Job: {data.title}</h2>
              <WorkTimeBadge jobTime={data.work_time} />
            </div>
            <div className="flex gap-4 mt-2 body_medium text-(--gray2)">
              <p className="">Position: {data.position}</p>
              {" | "}
              <span className=" flex gap-2 items-center">
                <LocationOnIcon sx={{ height: 20, width: 20 }} />
                <p>Location: {data.location}</p>
              </span>
              {" | "}

              <p>Status: {data.status}</p>
              {" | "}

              <p>Applied: {dateFormat(data.applied_at)}</p>
            </div>
            <div className="mt-4 w-full">
              <h3 className="body_large_500 uppercase">Description</h3>
              <article className="mt-6 body_medium">{data.description}</article>
            </div>
            <div className="mt-4 w-full">
              <h3 className="body_large_500 uppercase">Responsibilites</h3>
              <article className="mt-6 body_medium">
                {data.responsibilities || "No responsibilities"}
              </article>
            </div>
            <hr className="my-8" />
            <>
              <h3 className="body_large_500 uppercase">Covering Letter</h3>
              <article className="mt-6 body_medium">
                {data.covering_letter || "No covering letter"}
              </article>
            </>

            <button
              onClick={handleClose}
              className="px-6 py-3 rounded-sm bg-(--primary5) text-white button cursor-pointer flex justify-self-center mt-8"
            >
              Close
            </button>
          </>
        )}
      </Box>
    </Modal>
  );
};

export default ApplicationDetails;
