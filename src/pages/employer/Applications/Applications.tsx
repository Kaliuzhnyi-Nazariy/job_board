import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import { getApplications } from "../../../../features/application/applicationRequest";
import ApplicationCandidateDetails from "../../../Components/modals/Applications/ApplicationCandidateDetails";
import React, { useState } from "react";
import ApplicationCard from "./ApplicationCard";
import type { JobApplicatinon } from "../../../../features/application/interfaces";

const Applications = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { jobId } = useParams();

  const [applicationId, setApplicationId] = useState<string | null>(null);

  const { data, isLoading, isError } = useQuery<JobApplicatinon[]>({
    queryKey: ["getApplications", jobId],
    queryFn: () => getApplications(jobId!),
  });

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError || !data) return <p>Error occured!</p>;

  const candidateList = data.filter(
    (aj) => aj.status !== "rejected" && aj.status !== "accepted",
  );
  const submittedCandidates = data.filter((aj) => aj.status === "accepted");

  return (
    <>
      <div>
        <h1>Applications</h1>
        <ul className="grid grid-cols-3">
          <li>
            <h2>All application ({data.length})</h2>
            {data.length > 0 ? (
              <ul>
                {data.map((ap) => {
                  return (
                    <ApplicationCard
                      ap={ap}
                      handleOpen={handleOpen}
                      key={ap.id}
                      setApplicationId={setApplicationId}
                    />
                  );
                })}
              </ul>
            ) : (
              <p>No applications yet!</p>
            )}
          </li>
          <li>
            <ul>
              <h2>Applied ({candidateList.length})</h2>
              {candidateList.length > 0 ? (
                <ul>
                  {candidateList.map((ap) => {
                    return (
                      <ApplicationCard
                        ap={ap}
                        handleOpen={handleOpen}
                        key={ap.id}
                        setApplicationId={setApplicationId}
                      />
                    );
                  })}
                </ul>
              ) : (
                <p>No shorten list candidates!</p>
              )}
            </ul>
          </li>
          <li>
            <h2>Submitted ({submittedCandidates.length})</h2>
            {submittedCandidates.length > 0 ? (
              <ul>
                {submittedCandidates.map((ap) => {
                  return (
                    <ApplicationCard
                      ap={ap}
                      handleOpen={handleOpen}
                      key={ap.id}
                      setApplicationId={setApplicationId}
                    />
                  );
                })}
              </ul>
            ) : (
              <p>No hired candidate yet!</p>
            )}
          </li>
        </ul>
      </div>
      <ApplicationCandidateDetails
        open={open}
        handleClose={handleClose}
        applicationId={applicationId}
        jobId={jobId!}
      />
      ;
    </>
  );
};

export default Applications;
