import VacanciesView from "./VacanciesView";
import JobFilter from "./JobFilter";
import Section from "../../../Section";

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
    // <div className="flex justify-between">
    //   <JobFilter />
    //   <VacanciesView
    //     setView={setView}
    //     setJobNumberOnPage={setJobNumberOnPage}
    //     setSortingType={setSortingType}
    //   />
    // </div>
    <Section extraStyles="flex justify-between py-4.5">
      <JobFilter />
      <VacanciesView
        setView={setView}
        setJobNumberOnPage={setJobNumberOnPage}
        setSortingType={setSortingType}
      />
    </Section>
  );
};

export default JobHeader;
