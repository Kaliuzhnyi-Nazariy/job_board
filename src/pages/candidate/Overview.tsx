import { useSelector } from "react-redux";
import { username } from "../../../features/user/userSelector";
import { useQuery } from "@tanstack/react-query";
import {
  getCandidateApplications,
  getCandidateRecentApplications,
} from "../../../features/application/applicationRequest";
import { Link } from "react-router";
import { dateFormat, workTimeFormat } from "../../helpers";
import ApplicationDetails from "../../Components/modals/ApplicationDetails";
import { useState } from "react";
import type { CandidateRecentApplications } from "../../../features/application/interfaces";

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
      <div>
        <h1>Hello, {usernameValue}</h1>
        <small>Here is your daily activities and job alerts</small>
        <Link
          to={`applied-jobs`}
          className="w-78 h-26 bg-(--primary50) px-6 py-5 rounded-lg flex gap-6 justify-between cursor-pointer"
        >
          <div className="">
            <p className="font-semibold text-2xl">
              {isLoading ? "Loading..." : data?.length}
            </p>
            <p className="body_small">Applied jobs</p>
          </div>
          <div className="size-16 bg-white rounded-[5px] p-4">
            <div className="size-8 bg-(--primary5)"></div>
          </div>
        </Link>
        <div className="w-full h-150">
          {applicationsLoading ? (
            <p>applications loading</p>
          ) : candidateApplications && candidateApplications.length > 0 ? (
            // candidateApplications.length
            <ul className="w-full">
              {candidateApplications.map((ca) => {
                return (
                  <li key={ca.id} className="flex p-5 justify-between w-full">
                    <div className="flex gap-4">
                      <div className="size-14 bg-purple-500"></div>
                      <div className="flex flex-col gap-2.5">
                        <div className="flex gap-2">
                          <h5>{ca.title}</h5>
                          <span>{workTimeFormat(ca.work_time)}</span>
                        </div>
                        <div className="flex gap-4 opacity-50">
                          <p>{ca.location}</p>
                          <p>{ca.salary}</p>
                        </div>
                      </div>
                    </div>
                    <p>{dateFormat(ca.applied_at)}</p>
                    <p>{ca.status}</p>
                    <button onClick={() => openModalFn(ca.id)}>
                      View Details
                    </button>
                  </li>
                );
              })}
            </ul>
          ) : (
            <p>No applications yet!</p>
          )}
        </div>
      </div>
      <ApplicationDetails
        open={openModal}
        handleClose={closeModal}
        applicationId={applicationId!}
      />
    </>
  );
};

export default Overview;
