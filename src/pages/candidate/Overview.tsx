import { useSelector } from "react-redux";
import { username } from "../../../features/user/userSelector";
import { useQuery } from "@tanstack/react-query";
import {
  getCandidateApplications,
  getCandidateRecentApplications,
} from "../../../features/application/applicationRequest";
import { Link } from "react-router";
// import { dateFormat, workTimeFormat } from "../../helpers";
import ApplicationDetails from "../../Components/modals/ApplicationDetails";
import { useState } from "react";
import type { CandidateRecentApplications } from "../../../features/application/interfaces";
import DashboardSection from "../../Components/DashboardSection";

import WorkOutlineOutlinedIcon from "@mui/icons-material/WorkOutlineOutlined";
import OverviewCandidateList from "../../Components/Overview/OverviewCandidateList";

const Overview = () => {
  const usernameValue = useSelector(username);

  const { data, isLoading } = useQuery({
    queryKey: ["getMyApplications"],
    queryFn: getCandidateApplications,
  });

  const {
    data: candidateApplications,
    isLoading: applicationsLoading,
    // isError: applicationsError,
  } = useQuery<CandidateRecentApplications[]>({
    queryKey: ["candidateRecentApplications"],
    queryFn: getCandidateRecentApplications,
  });

  const [openModal, setOpenModal] = useState(false);
  const [applicationId, setApplicationId] = useState<string | null>(null);

  const openModalFn = (jobId: string) => {
    setOpenModal(true);
    setApplicationId(jobId);
  };

  const closeModal = () => {
    setOpenModal(false);
    setApplicationId(null);
  };

  return (
    <>
      <DashboardSection>
        <h2 className="body_large_500">Hello, {usernameValue}</h2>
        <small className="body_small text-(--gray4)">
          Here is your daily activities and job alerts
        </small>
        <Link
          to={`applied-jobs`}
          className="w-78 h-26 bg-(--primary50) px-6 py-5 rounded-lg flex gap-6 justify-between items-center cursor-pointer mt-6"
        >
          <div className="flex flex-col gap-1 justify-center  ">
            <p className="font-semibold text-2xl">
              {isLoading ? "Loading..." : data?.length}
            </p>
            <p className="body_small">Applied jobs</p>
          </div>
          <div className="size-16 bg-white rounded-[5px] p-4">
            {/* <div className="size-8 bg-(--primary5)"></div> */}
            <WorkOutlineOutlinedIcon
              sx={{ fill: "var(--primary5)", fontSize: "32px" }}
            />
          </div>
        </Link>
        <OverviewCandidateList
          applicationsLoading={applicationsLoading}
          candidateApplications={candidateApplications}
          openModalFn={openModalFn}
        />
      </DashboardSection>
      <ApplicationDetails
        open={openModal}
        handleClose={closeModal}
        applicationId={applicationId!}
      />
    </>
  );
};

export default Overview;
