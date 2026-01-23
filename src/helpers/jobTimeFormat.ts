import type { workTime } from "../../features/job/interfaces";

export const workTimeFormat = (jobTime: workTime | undefined) => {
  switch (jobTime) {
    case "full_time":
      return "Full-Time";
    case "part_time":
      return "Part-Time";
    case "internship":
      return "Internship";
    case "contract":
      return "Contract";
    default:
      return "No data";
  }
};
