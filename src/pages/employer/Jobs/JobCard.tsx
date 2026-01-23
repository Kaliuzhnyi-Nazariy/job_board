import type { IJob } from "../../../../features/job/interfaces";
import { Link } from "react-router";
import { workTimeFormat } from "../../../helpers/jobTimeFormat";

const JobCard = ({ data }: { data: IJob }) => {
  return (
    <div className="flex p-5 justify-between w-full">
      <Link to={`/employer/dashboard/my-jobs/${data.id}`}>
        <div className="">
          <h2>{data.title}</h2>
          <p className="opacity-50">{workTimeFormat(data.work_time)}</p>
        </div>

        <div className="">.</div>
      </Link>
      <Link to={`/employer/view-application/` + data.id}>View Applcations</Link>
    </div>
  );
};

export default JobCard;
