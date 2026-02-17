import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router";
import { getApplications } from "../../../../features/application/applicationRequest";
import ApplicationCandidateDetails from "../../../Components/modals/Applications/ApplicationCandidateDetails";
import React, { useState } from "react";
import type { JobApplicatinon } from "../../../../features/application/interfaces";
import DashboardSection from "../../../Components/Dashboard/DashboardSection";
import ListOfApplications from "./ListOfApplications";
import ListOfApplicationsMob from "./ListOfApplicationsMob";

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

  return (
    <>
      <DashboardSection>
        <span className="body_small text-(--gray6) block">
          <Link to={"/"}>Home</Link>
          {" / "}
          <Link to={"/employer/dashboard/my-jobs"}>Job</Link>
          {" / "}
          <span className="body_small_500 text-(--primary5)">Applications</span>
        </span>
        <label className="body_xl_500 mt-1.5">Job Applications</label>

        <ListOfApplicationsMob
          data={data}
          handleOpen={handleOpen}
          setApplicationId={setApplicationId}
          candidateList={candidateList}
          submittedCandidates={submittedCandidates}
        />

        <ListOfApplications
          data={data}
          handleOpen={handleOpen}
          setApplicationId={setApplicationId}
          candidateList={candidateList}
          submittedCandidates={submittedCandidates}
        />
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
