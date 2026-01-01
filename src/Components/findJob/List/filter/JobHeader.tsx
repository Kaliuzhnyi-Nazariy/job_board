import VacanciesView from "./VacanciesView";
import JobFilter from "./JobFilter";

const JobHeader = ({
  setView,
  setJobNumberOnPage,
  setSortingType,
}: {
  setView: (view: "grid" | "list") => void;
  setJobNumberOnPage: (number: 12 | 16) => void;
  setSortingType: (type: "oldest" | "newest") => void;
}) => {
  return (
    <div className="flex justify-between">
      <JobFilter />
      <VacanciesView
        setView={setView}
        setJobNumberOnPage={setJobNumberOnPage}
        setSortingType={setSortingType}
      />
    </div>
  );
};

export default JobHeader;
