import { Box, Modal } from "@mui/material";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  getApplicantDetails,
  updateStatusOfApplication,
} from "../../../../features/application/applicationRequest";
import { Link } from "react-router";
import CandidateContactInformation from "./CandidateContactInformation";

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
    mutationFn: () => updateStatusOfApplication(applicationId!, "rejected"),
  });

  const { mutate: hireApplication } = useMutation({
    mutationKey: ["rejectApplicationStatus"],
    mutationFn: () => updateStatusOfApplication(applicationId!, "accepted"),
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
        }}
      >
        {/* <h2>Applicant data</h2> */}
        {/* <p>{applicationId}</p>
        <p>{jobId}</p> */}
        {isLoading || !data ? (
          "Loading"
        ) : (
          <>
            <div className="flex items-center justify-between">
              <div className="flex gap-6 items-center">
                <div className="size-20 rounded-full bg-gray-500"></div>
                <div className="flex flex-col gap-2">
                  <h3>{data.full_name}</h3>
                  <span className="opacity-50">{data.speciality}</span>
                </div>
              </div>
              <ul className="flex gap-3">
                <li>
                  <Link to={`mailto:` + data.email}>Send Mail</Link>
                </li>
                {data.status === "applied" && (
                  <li>
                    <button onClick={() => hireApplication()}>
                      Hire Candidate
                    </button>
                  </li>
                )}
              </ul>
            </div>
            <div className="grid grid-cols-2 g-18">
              <div className="">
                <>
                  <h3>Biography</h3>
                  <article>{data.biography || "No biography"}</article>
                </>

                <>
                  <h3>Cover letter</h3>
                  <article>{data.covering_letter || "No letter"}</article>
                </>
              </div>

              <div className="">
                <div className="grid grid-cols-2 gap-x-4 gap-y-6">
                  <div className="">
                    <div className="size-6 bg-blue-500"></div>
                    <h5>DATE OF BIRTH</h5>
                    <p className="text-[12px]">{data.date_of_birth}</p>
                  </div>

                  <div className="">
                    <div className="size-6 bg-blue-500"></div>
                    <h5>gender</h5>
                    <p className="text-[12px]">{data.gender}</p>
                  </div>

                  <div className="">
                    <div className="size-6 bg-blue-500"></div>
                    <h5>experience</h5>
                    <p className="text-[12px]">{data.experience}</p>
                  </div>

                  <div className="">
                    <div className="size-6 bg-blue-500"></div>
                    <h5>education</h5>
                    <p className="text-[12px]">{data.education}</p>
                  </div>
                </div>

                <CandidateContactInformation data={data} />
                {/* <div className="">
                  <h3>Contact Information</h3>
                  <ul>
                    {data.website && (
                      <li>
                        <div className="flex gap-4">
                          <div className="size-8 rounded-full bg-blue-500"></div>
                          <div>
                            <h5>WEBSite</h5>
                            <Link to={data.website}>{data.website}</Link>
                          </div>
                        </div>
                      </li>
                    )}
                    {data.location && (
                      <li>
                        <div className="flex gap-4">
                          <div className="size-8 rounded-full bg-blue-500"></div>
                          <div>
                            <h5>location</h5>
                            <p>{data.location}</p>
                          </div>
                        </div>
                      </li>
                    )}
                    {data.phone && (
                      <li>
                        <div className="flex gap-4">
                          <div className="size-8 rounded-full bg-blue-500"></div>
                          <div>
                            <h5>phone</h5>
                            <p>{data.phone}</p>
                          </div>
                        </div>
                      </li>
                    )}
                    <li>
                      <div className="flex gap-4">
                        <div className="size-8 rounded-full bg-blue-500"></div>
                        <div>
                          <h5>Email Address</h5>
                          <Link to={`mailto:${data.website}`}>
                            {data.email}
                          </Link>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div> */}
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
