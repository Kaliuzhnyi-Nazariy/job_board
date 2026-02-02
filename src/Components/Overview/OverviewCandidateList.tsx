import { Link } from "react-router";
import type { CandidateRecentApplications } from "../../../features/application/interfaces";

import ArrowRightAltOutlinedIcon from "@mui/icons-material/ArrowRightAltOutlined";
import AppliedListItem from "../../pages/candidate/Applied/AppliedListItem";

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
              return <AppliedListItem data={ca} handleOpen={openModalFn} />;
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
