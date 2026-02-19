// import { useState } from "react";
import JobHeader from "./filter/JobHeader";
import JobList from "./JobList";

export interface IJobList {
  id: string;
  title: string;
  location: string;
  position: string;
  salary: string;
  work_time: "full_time" | "part_time" | "internship" | "contract";
  created_at: number;
}

const JobComponent = () => {
  return (
    <div>
      <JobHeader />
      <JobList />
    </div>
  );
};

export default JobComponent;
