import { useSelector } from "react-redux";
import { userId } from "../../../../features/user/userSelector";
import { useQuery } from "@tanstack/react-query";
import {
  getCandidateApplications,
  getCandidateCountApplications,
} from "../../../../features/application/applicationRequest";
import { useEffect, useState } from "react";
import ApplicationDetails from "../../../Components/modals/ApplicationDetails";
import DashboardSection from "../../../Components/DashboardSection";
import { useSearchParams } from "react-router";
import AppliedListItem from "./AppliedListItem";

const Applied = () => {
  const [openModal, setModalOpen] = useState(false);
  const [applicationId, setApplicationId] = useState<string | null>(null);

  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    return setSearchParams((prev) => {
      const params = new URLSearchParams(prev);
      params.set("page", "1");
      return params;
    });
  }, []);

  const applicationsPage = searchParams.get("page");

  const handleOpen = (jobId: string) => {
    setModalOpen(true);
    setApplicationId(jobId);
  };
  const handleClose = () => {
    setModalOpen(false);
    setApplicationId(null);
  };

  const userIdValue = useSelector(userId);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["getMyApplications", userIdValue, applicationsPage],
    queryFn: () => getCandidateApplications(applicationsPage),
  });

  const {
    data: applicationsCount,
    // isLoading: applicationsLoading,
    // isError: applicationError,
  } = useQuery({
    queryKey: ["getMyApplicationsCount"],
    queryFn: getCandidateCountApplications,
  });

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>Error ocurred!</p>;
  }

  // make a model which is going to be opened after clicking view details button, the request to get data is already exist

  return (
    <DashboardSection>
      <h2 className="body_large">
        Applied Jobs
        <span className="opacity-50">
          {" "}
          ({applicationsCount ? applicationsCount.count : 0})
        </span>
      </h2>
      {data && data.length > 0 ? (
        <>
          <ul className="w-full grid grid-cols-[3fr_1fr_1fr_1fr] px-5 py-2.5 body_xs bg-(--gray50) mt-4">
            <li>Job</li>
            <li className="justify-self-center">Date Applied</li>
            <li className="justify-self-center">Status</li>
            <li className="justify-self-center">Action</li>
          </ul>
          <ul className="w-full">
            {data.map((aj) => {
              return <AppliedListItem data={aj} handleOpen={handleOpen} />;
            })}
          </ul>
        </>
      ) : (
        <p>You haven't applied yet!</p>
      )}
      <ApplicationDetails
        open={openModal}
        handleClose={handleClose}
        applicationId={applicationId!}
      />
    </DashboardSection>

    // TO-DO: add pagination
  );
};

export default Applied;
