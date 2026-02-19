import AppliedListItem from "../pages/candidate/Applied/AppliedListItem";
import type { CandidateRecentApplications } from "../../features/application/interfaces";

const AppliedList = ({
  applications,
  handleOpen,
}: {
  applications: CandidateRecentApplications[];
  handleOpen: (id: string) => void;
}) => {
  return (
    <>
      <ul className="w-full grid grid-cols-[2fr_1fr_1fr] min-[1024px]:grid-cols-[3fr_1fr_1fr_1fr] px-5 py-2.5 body_xs bg-(--gray50) mt-4">
        <li>Job</li>
        <li className="justify-self-center hidden min-[1024px]:block">
          Date Applied
        </li>
        <li className="justify-self-center">Status</li>
        <li className="justify-self-center">Action</li>
      </ul>
      <ul className="w-full mt-2">
        {applications.map((ca) => {
          return <AppliedListItem data={ca} handleOpen={handleOpen} />;
        })}
      </ul>
    </>
  );
};

export default AppliedList;
