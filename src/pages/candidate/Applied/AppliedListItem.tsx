import type { CandidateApplication } from "../../../../features/application/interfaces";
import ApplicationStatusBadge from "../../../Components/ApplicationStatusBadge";
import WorkTimeBadge from "../../../Components/WorkTimeBadge";
import { dateFormat } from "../../../helpers";

import LocationOnIcon from "@mui/icons-material/LocationOn";
import AttachMoneyOutlinedIcon from "@mui/icons-material/AttachMoneyOutlined";

const AppliedListItem = ({
  data,
  handleOpen,
}: {
  data: CandidateApplication;
  handleOpen: (id: string) => void;
}) => {
  return (
    <li
      key={data.id}
      className="p-5 grid grid-cols-[2fr_1fr_1fr] min-[1024px]:grid-cols-[3fr_1fr_1fr_1fr] outline outline-blue-500"
    >
      <div className="flex gap-4">
        <div className="size-14 bg-purple-500 hidden min-[1024px]:block"></div>
        <div className="flex flex-col gap-2.5">
          <div className="flex flex-col min-[1024px]:flex-row gap-2">
            <h5 className="body_medium_500">{data.title}</h5>
            <WorkTimeBadge jobTime={data.work_time} />
          </div>
          <div className="flex flex-col min-[1024px]:flex-row min-[1024px]:gap-4">
            <span className="flex items-center gap-1.5">
              <LocationOnIcon
                sx={{
                  height: "20px",
                  width: "20px",
                  color: "var(--gray2)",
                }}
              />
              <p className="body_small text-(--gray6)">{data.location}</p>
            </span>
            <span className="flex items-center gap-1.5">
              <AttachMoneyOutlinedIcon
                sx={{
                  width: "20px",
                  height: "20px",
                  color: "var(--gray2)",
                }}
              />
              <p className="body_small text-(--gray6)">{data.salary}</p>
            </span>
          </div>
        </div>
      </div>
      <p className="text-(--gray6) body_small self-center hidden min-[1024px]:block">
        {dateFormat(data.applied_at)}
      </p>
      <ApplicationStatusBadge status={data.status} />
      <button
        onClick={() => handleOpen(data.id)}
        className="text-(--primary5) button px-6 py-3 bg-(--gray50) cursor-pointer"
      >
        View Details
      </button>
    </li>
  );
};

export default AppliedListItem;
