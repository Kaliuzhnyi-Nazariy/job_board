import { Box, Modal } from "@mui/material";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  getApplicantDetails,
  updateApplicationStatus,
} from "../../../../features/application/applicationRequest";
import { Link } from "react-router";
import ContactData from "../../Candidate/ContactData";

import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import ArrowCircleRightOutlinedIcon from "@mui/icons-material/ArrowCircleRightOutlined";
import GeneralData from "../../Candidate/GeneralData";

const ApplicationCandidateDetails = ({
  open,
  handleClose,
  applicationId,
  jobId,
}: {
  open: boolean;
  handleClose: () => void;
  applicationId: string | null;
  jobId: string;
}) => {
  const { data, isLoading } = useQuery({
    queryKey: ["getCandidateDetails", applicationId],
    queryFn: () => getApplicantDetails(jobId, applicationId!),
    enabled: open && !!applicationId && !!jobId,
  });

  const { mutate: rejectApplication } = useMutation({
    mutationKey: ["rejectApplicationStatus"],
    mutationFn: () => updateApplicationStatus(applicationId!, "rejected"),
  });

  const { mutate: hireApplication } = useMutation({
    mutationKey: ["rejectApplicationStatus"],
    mutationFn: () => updateApplicationStatus(applicationId!, "accepted"),
  });

  if (!open) return null;

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
          padding: "48px",
        }}
      >
        {isLoading || !data ? (
          "Loading"
        ) : (
          <>
            <div className="flex items-center justify-between">
              <div className="flex gap-6 items-center">
                <div className="size-20 rounded-full bg-gray-500"></div>
                <div className="flex flex-col gap-2">
                  <h5>{data.full_name}</h5>
                  <span className="mt-1 body_small text-(--gray5)">
                    {data.speciality}
                  </span>
                </div>
              </div>
              <ul className="flex gap-3 items-center">
                <li>
                  <Link
                    to={`mailto:${data.email}`}
                    className="border-2 border-(--primary5) rounded-sm px-6 py-3 flex gap-3 items-center h-12 button text-(--primary5) transition-colors duration-150 hover:bg-(--primary50) hover:text-(--primary6) hover:border-(--primary6) "
                  >
                    <EmailOutlinedIcon />
                    <span>Send email</span>
                  </Link>{" "}
                </li>
                {data.status === "applied" && (
                  <li>
                    <button
                      className="border border-transparent bg-(--primary5) text-white button flex gap-3 items-center px-6 py-3 rounded-sm h-12 cursor-pointer hover:bg-(--primary6) transition-colors duration-150"
                      onClick={() => hireApplication()}
                    >
                      <ArrowCircleRightOutlinedIcon />
                      <span>Hire Candidate</span>
                    </button>
                  </li>
                )}
              </ul>
            </div>

            <div className="grid grid-cols-[2fr_1fr] gap-18 mt-10">
              <div className="">
                <h4 className="uppercase text-lg font-medium">Biography</h4>
                <article className="mt-6 body_medimum text-(--gray6)">
                  {data.biography || "no bio"}
                </article>

                <hr className="h-px text-(--gray1) my-8" />

                <h4 className="uppercase text-lg font-medium">COVER LETTER</h4>
                <article className="mt-6 body_medimum text-(--gray6)">
                  {data.covering_letter || "no cover letter"}
                </article>
              </div>
              <div className="flex flex-col gap-6">
                <GeneralData
                  date_of_birth={data.date_of_birth}
                  gender={data.gender}
                  experience={data.experience}
                  education={data.education}
                />

                <ContactData
                  website={data.website}
                  location={data.location}
                  phone={data.phone}
                  email={data.email}
                />
              </div>
            </div>
            {data.status === "applied" && (
              <div className="w-full flex justify-around items-center">
                <button
                  className="cursor-pointer"
                  onClick={() => rejectApplication()}
                >
                  Reject
                </button>
                <button
                  className="cursor-pointer"
                  onClick={() => hireApplication()}
                >
                  Hire
                </button>
              </div>
            )}
          </>
        )}
      </Box>
    </Modal>
  );
};

export default ApplicationCandidateDetails;
