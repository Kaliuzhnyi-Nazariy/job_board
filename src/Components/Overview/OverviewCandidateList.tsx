import { Link } from "react-router";
import type { CandidateRecentApplications } from "../../../features/application/interfaces";
import { dateFormat } from "../../helpers";

import WorkTimeBadge from "../WorkTimeBadge";

import ArrowRightAltOutlinedIcon from "@mui/icons-material/ArrowRightAltOutlined";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AttachMoneyOutlinedIcon from "@mui/icons-material/AttachMoneyOutlined";
import ApplicationStatusBadge from "../ApplicationStatusBadge";

const OverviewCandidateList = ({
  applicationsLoading,
  candidateApplications,
  openModalFn,
}: {
  applicationsLoading: boolean;
  candidateApplications: CandidateRecentApplications[] | undefined;
  openModalFn: (id: string) => void;
}) => {
  return (
    <div className=" h-150 mt-8 relative">
      <div className="w-full flex justify-between items-center">
        <h4 className="body_medium_500">Recently Applied</h4>
        <Link
          to={"applied-jobs"}
          className="flex gap-2 items-center text-(--gray5)"
        >
          View all <ArrowRightAltOutlinedIcon />
        </Link>
      </div>

      {applicationsLoading ? (
        <p className="absolute top-1/2 left-1/2 -translate-x-1/2">
          applications loading
        </p>
      ) : candidateApplications && candidateApplications.length > 0 ? (
        <>
          <ul className="w-full grid grid-cols-[3fr_1fr_1fr_1fr] px-5 py-2.5 body_xs bg-(--gray50) mt-4">
            <li>Job</li>
            <li className="justify-self-center">Date Applied</li>
            <li className="justify-self-center">Status</li>
            <li className="justify-self-center">Action</li>
          </ul>
          <ul className="w-full mt-2">
            {candidateApplications.map((ca) => {
              return (
                <li
                  key={ca.id}
                  className="p-5 grid grid-cols-[3fr_1fr_1fr_1fr]"
                >
                  <div className="flex gap-4">
                    <div className="size-14 bg-purple-500"></div>
                    <div className="flex flex-col gap-2.5">
                      <div className="flex gap-2">
                        <h5 className="body_medium_500">{ca.title}</h5>
                        <WorkTimeBadge jobTime={ca.work_time} />
                      </div>
                      <div className="flex gap-4">
                        <span className="flex items-center gap-1.5">
                          <LocationOnIcon
                            sx={{
                              height: "20px",
                              width: "20px",
                              color: "var(--gray2)",
                            }}
                          />
                          <p className="body_small text-(--gray6)">
                            {ca.location}
                          </p>
                        </span>
                        <span className="flex items-center gap-1.5">
                          <AttachMoneyOutlinedIcon
                            sx={{
                              width: "20px",
                              height: "20px",
                              color: "var(--gray2)",
                            }}
                          />
                          <p className="body_small text-(--gray6)">
                            {ca.salary}
                          </p>
                        </span>
                      </div>
                    </div>
                  </div>
                  <p className="text-(--gray6) body_small self-center">
                    {dateFormat(ca.applied_at)}
                  </p>
                  <ApplicationStatusBadge status={ca.status} />
                  {/* <p>{ca.status}</p> */}
                  <button
                    onClick={() => openModalFn(ca.id)}
                    className="text-(--primary5) button px-6 py-3 bg-(--gray50)"
                  >
                    View Details
                  </button>
                </li>
              );
            })}
          </ul>
        </>
      ) : (
        <p>No applications yet!</p>
      )}
    </div>
  );
};

export default OverviewCandidateList;
