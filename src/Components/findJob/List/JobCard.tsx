import LocationOnIcon from "@mui/icons-material/LocationOn";
import type { IJobList } from "./JobComponent";
import { workTimeFormat } from "../../../helpers/jobTimeFormat";

const JobCard = ({ job }: { job: IJobList }) => {
  const { title, location, position, work_time, salary } = job;

  return (
    <div className="p-8 border border-[#636A80] rounded-sm">
      <div className="flex gap-4">
        <div className="size-14 rounded-sm bg-pink-600"></div>
        <div className="">
          <h3>{title}</h3>
          <span className="flex gap-1.5 opacity-50">
            <LocationOnIcon />
            <p>{location}</p>
          </span>
        </div>
      </div>
      <h2>{position}</h2>
      <div className="flex gap-2 opacity-50">
        <p>{workTimeFormat(work_time)}</p>
        <p>&#183;</p>
        <p>{salary}</p>
      </div>
    </div>
  );
};

export default JobCard;
