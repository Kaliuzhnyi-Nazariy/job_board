type workTime = "full_time" | "part_time" | "internship" | "contract";

type statuses = "applied" | "rejected" | "accepted";

export interface CandidateApplication {
  id: string;
  title: string;
  location: string;
  salary: string;
  work_time: workTime;
  status: statuses;
  applied_at: Date;
}
