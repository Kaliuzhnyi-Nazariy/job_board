export interface IJobForm {
  title: string;
  position: string;
  description: string;
  minSalary: string;
  maxSalary: string;
  salaryType: "month" | "week" | "year" | "contract";
  workTime: "full_time" | "part_time" | "internship" | "contract";
  location: string;

  education?: string;
  responsobilities?: string;
  experience?: string;
}

export interface IJob {
  title: string;
  position: string;
  description: string;
  minSalary: string;
  maxSalary: string;
  salaryType: "month" | "week" | "year" | "contract";
  workTime: "full_time" | "part_time" | "internship" | "contract";
  location: string;
}

export type Job = Omit<IJob, "minSalary" | "maxSalary" | "salaryType"> & {
  owner_id: string;
  salary: string;
};

export interface InitialJobState {
  isLoading: boolean;
  isError: null | string;
}
