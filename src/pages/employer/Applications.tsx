import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useParams } from "react-router";
import { getApplications } from "../../../features/application/applicationRequest";

const Applications = () => {
  const { jobId } = useParams();

  const { data, isLoading } = useQuery({
    queryKey: ["getApplications", jobId],
    queryFn: () => getApplications(jobId!),
  });

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>Applications</h1>
      {data.length}
    </div>
  );
};

export default Applications;
