import { useSelector } from "react-redux";
import { userId } from "../../../../features/user/userSelector";
import { useQuery } from "@tanstack/react-query";
import {
  getCandidateApplications,
  getCandidateCountApplications,
} from "../../../../features/application/applicationRequest";
import { useEffect, useState } from "react";
import ApplicationDetails from "../../../Components/modals/ApplicationDetails";
import DashboardSection from "../../../Components/Dashboard/DashboardSection";
import { useSearchParams } from "react-router";
import PaginationComponent from "../../../Components/Pagination";
import AppliedList from "../../../Components/AppliedList";

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

  const { data: applicationsCount } = useQuery({
    queryKey: ["getMyApplicationsCount"],
    queryFn: getCandidateCountApplications,
  });

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>Error ocurred!</p>;
  }

  const amountOfPages = applicationsCount.count
    ? Math.ceil(applicationsCount.count / 8)
    : 0;

  return (
    <DashboardSection extraStyles="pb-6 min-[1024px]:pb-0 flex flex-col min-[1440px]:pb-6 ">
      <h2 className="body_large">
        Applied Jobs
        <span className="opacity-50">
          {" "}
          ({applicationsCount ? applicationsCount.count : 0})
        </span>
      </h2>
      {data && data.length > 0 ? (
        <>
          <AppliedList applications={data} handleOpen={handleOpen} />
        </>
      ) : (
        <p>You haven't applied yet!</p>
      )}

      <PaginationComponent
        page={Number(applicationsPage)}
        pageAmount={amountOfPages}
        setSearchParams={setSearchParams}
      />

      <ApplicationDetails
        open={openModal}
        handleClose={handleClose}
        applicationId={applicationId!}
      />
    </DashboardSection>
  );
};

export default Applied;
