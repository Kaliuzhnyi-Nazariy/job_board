import { workTimeFormat } from "../helpers";
import type { workTime } from "../../features/job/interfaces";

const WorkTimeBadge = ({ jobTime }: { jobTime: workTime | undefined }) => {
  return (
    <span className="text-(--primary5) body_small bg-(--primary50) rounded-[52px] px-3 py-0.75 flex justify-center items-center">
      {workTimeFormat(jobTime)}
    </span>
  );
};

export default WorkTimeBadge;
