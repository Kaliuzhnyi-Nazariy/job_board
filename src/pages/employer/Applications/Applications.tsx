import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router";
import { getApplications } from "../../../../features/application/applicationRequest";
import ApplicationCandidateDetails from "../../../Components/modals/Applications/ApplicationCandidateDetails";
import React, { useState } from "react";
import ApplicationCard from "./ApplicationCard";
import type { JobApplicatinon } from "../../../../features/application/interfaces";
import DashboardSection from "../../../Components/Dashboard/DashboardSection";

const Applications = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { jobId } = useParams();

  const [applicationId, setApplicationId] = useState<string | null>(null);

  const { data, isLoading, isError, refetch } = useQuery<JobApplicatinon[]>({
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

  const listStyle = "px-5 py-4 border border-(--gray1) rounded-md bg-[#F1F2F4]";

  return (
    <>
      <DashboardSection>
        <span className="body_small text-(--gray6) block">
          <Link to={"/employer/home"}>Home</Link>
          {" / "}
          <Link to={"/employer/dashboard/my-jobs"}>Job</Link>
          {" / "}
          <span className="body_small_500 text-(--primary5)">Applications</span>
        </span>

        <label className="body_xl_500 mt-1.5">Job Applications</label>

        <ul className="grid grid-cols-3 mt-6 gap-6">
          <li className={listStyle}>
            <p className="body_small_400">All application ({data.length})</p>
            {data.length > 0 ? (
              <ul className="mt-3 flex flex-col gap-3 max-h-140 overflow-x-hidden overflow-y-auto">
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
          <li className={listStyle}>
            <ul>
              <p className="body_small_400">Applied ({candidateList.length})</p>
              {candidateList.length > 0 ? (
                <ul className="mt-3 flex flex-col gap-3 max-h-140 overflow-x-hidden overflow-y-auto">
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
          <li className={listStyle}>
            <p className="body_small_400">
              Submitted ({submittedCandidates.length})
            </p>
            {submittedCandidates.length > 0 ? (
              <ul className="mt-3 flex flex-col gap-3 max-h-140 overflow-x-hidden overflow-y-auto">
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
      </DashboardSection>
      <ApplicationCandidateDetails
        open={open}
        handleClose={handleClose}
        applicationId={applicationId}
        jobId={jobId!}
        refetchApplications={refetch}
      />
      ;
    </>
  );
};

export default Applications;
