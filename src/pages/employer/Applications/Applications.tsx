import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router";
import { getApplications } from "../../../../features/application/applicationRequest";
import ApplicationCandidateDetails from "../../../Components/modals/ApplicationCandidateDetails";
import React, { useState } from "react";
import ApplicationCard from "./ApplicationCard";

const Applications = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { jobId } = useParams();

  const [applicationId, setApplicationId] = useState<number | null>(null);

  const { data, isLoading } = useQuery({
    queryKey: ["getApplications", jobId],
    queryFn: () => getApplications(jobId!),
  });

  if (isLoading) {
    return <p>Loading...</p>;
  }

  const candidateList = data.filter((aj) => aj.status !== "rejected");

  return (
    <>
      <div>
        <h1>Applications</h1>
        <ul className="grid grid-cols-3">
          <li>
            <h2>All applications</h2>
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
          </li>
          <li>
            <ul>
              <h2>Applied</h2>
              {candidateList.map((ap) => {
                return (
                  <li key={ap.id} className="w-60 ">
                    <Link to={`/employer/candidates/` + ap.user_id}>
                      <div className="w-full flex justify-between">
                        <h2 className="font-bold">{ap.full_name}</h2>
                        <span className="opacity-50">{ap.speciality}</span>
                      </div>

                      <hr />

                      <ul className="list-[inside]">
                        <li>{ap.experience}</li>
                        <li>Education: {ap.education}</li>
                        <li>Applied: {ap.applied_at}</li>
                      </ul>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </li>
          <li>
            <h2>Submitted</h2>
            {/* <ul>
            {candidateList.map((ap) => {
              return (
                <li key={ap.id} className="w-60 ">
                  <Link to={`/employer/candidates/` + ap.user_id}>
                    <div className="w-full flex justify-between">
                      <h2 className="font-bold">{ap.full_name}</h2>
                      <span className="opacity-50">{ap.speciality}</span>
                    </div>

                    <hr />

                    <ul className="list-[inside]">
                      <li>{ap.experience}</li>
                      <li>Education: {ap.education}</li>
                      <li>Applied: {ap.applied_at}</li>
                    </ul>
                  </Link>
                </li>
              );
            })}
          </ul> */}
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
