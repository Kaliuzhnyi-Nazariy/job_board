import LocationOnIcon from "@mui/icons-material/LocationOn";
import type { IJobList } from "./JobComponent";
import { workTimeFormat } from "../../../helpers/jobTimeFormat";

const JobCard = ({
  job,
  listView,
}: {
  job: IJobList;
  listView: "grid" | "list";
}) => {
  const { title, location, position, work_time, salary } = job;

  return (
    <div className="p-2 min-[1024px]:p-8 border border-[#EDEFF5] rounded-xl h-full">
      <div
        className={
          "flex gap-4 " + (listView == "grid" ? "flex-col items-center" : "")
        }
      >
        <div className="size-14 rounded-sm bg-pink-600"></div>
        <div
          className={
            "flex gap-1.5 items-center " +
            (listView === "grid" ? "min-[768px]:flex-col" : "flex-col")
          }
        >
          <h3 className="body_medium_500">{title}</h3>
          <span className="body_small flex gap-1.5 opacity-50 items-center">
            <LocationOnIcon sx={{ fontSize: "18px" }} />
            <p>{location}</p>
          </span>
        </div>
      </div>
      <h2 className="body_xl_500 " style={{ marginTop: "24px" }}>
        {position}
      </h2>
      <div
        className={
          "flex gap-2 opacity-50 mt-2 " +
          (listView === "grid" ? "flex-col min-[1440px]:flex-row" : "")
        }
      >
        <p>{workTimeFormat(work_time)}</p>
        <p className={listView === "grid" ? "hidden min-[1440px]:block" : ""}>
          &#183;
        </p>
        <p>{salary}</p>
      </div>
    </div>
  );
};

export default JobCard;
