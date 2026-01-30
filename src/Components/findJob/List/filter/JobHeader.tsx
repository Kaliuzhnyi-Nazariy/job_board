import VacanciesView from "./VacanciesView";
import JobFilter from "./JobFilter";
import Section from "../../../Section";

const JobHeader = ({
  listView,
  setView,
  setJobNumberOnPage,
  setSortingType,
}: {
  listView: "grid" | "list";
  setView: (view: "grid" | "list") => void;
  setJobNumberOnPage: (number: 12 | 16) => void;
  setSortingType: (type: "oldest" | "newest") => void;
}) => {
  return (
    <Section extraStyles="flex justify-between py-4.5 items-center">
      <JobFilter />
      <VacanciesView
        listView={listView}
        setView={setView}
        setJobNumberOnPage={setJobNumberOnPage}
        setSortingType={setSortingType}
      />
    </Section>
  );
};

export default JobHeader;
