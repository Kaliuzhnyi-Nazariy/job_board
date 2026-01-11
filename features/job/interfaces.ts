export interface IJobForm {
  title: string;
  position: string;
  description: string;
  minSalary: number;
  maxSalary: number;
  salaryType: "month" | "week" | "hour" | "year" | "contract";
  workTime: "full_time" | "part_time" | "internship" | "contract";
  location: string;

  education?: string;
  responsobilities?: string;
  experience?: string;
}

export interface IJobFormUpdate {
  title: string;
  position: string;
  description: string;
  minSalary: number;
  maxSalary: number;
  salaryType: "month" | "week" | "hour" | "year" | "contract";
  workTime: "Full-Time" | "Part-Time" | "Internship" | "Contract";
  location: string;

  education?: string;
  responsobilities?: string;
  experience?: string;
}

export interface IJob {
  id: string;
  title: string;
  position: string;
  description?: string;
  minSalary: string;
  maxSalary: string;
  salaryType: "month" | "week" | "year" | "contract";
  work_time?: "full_time" | "part_time" | "internship" | "contract";
  location?: string;
  education?: string;
  responsobilities?: string;
  experience?: string;
}

export type Job = Omit<IJob, "minSalary" | "maxSalary" | "salaryType"> & {
  owner_id: string;
  salary: string;
};

export interface InitialJobState {
  isLoading: boolean;
  isError: null | string;
}

export interface IGetJob {
  page: number;
  limit: 12 | 16;
  order: "newest" | "oldest";
}
