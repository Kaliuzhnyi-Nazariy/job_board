import { useState } from "react";
import JobHeader from "./filter/JobHeader";
import JobList from "./JobList";

export interface IJobList {
  title: string;
  location: string;
  position: string;
  salary: string;
  work_time: "full_time" | "part_time" | "internship" | "contract";
  created_at: number;
}

const JobComponent = () => {
  const [listView, setListView] = useState<"grid" | "list">("grid");

  const setView = (view: "grid" | "list") => {
    if (view === listView) return;
    setListView(view);
  };

  const [jobNumber, setJobNumber] = useState<12 | 16>(12);

  const setJobNumberOnPage = (number: 12 | 16) => {
    if (number === jobNumber) return;
    setJobNumber(number);
  };

  const [jobSorting, setJobSorting] = useState<"oldest" | "newest">("oldest");

  const setSortingType = (type: "oldest" | "newest") => {
    if (type === jobSorting) return;
    setJobSorting(type);
  };

  return (
    <div>
      <JobHeader
        setView={setView}
        setJobNumberOnPage={setJobNumberOnPage}
        setSortingType={setSortingType}
      />
      <JobList listView={listView} jobSortingType={jobSorting} />
    </div>
  );
};

export default JobComponent;
