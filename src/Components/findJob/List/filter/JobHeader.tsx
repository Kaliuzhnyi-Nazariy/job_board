import FilterListView from "../../../FilterListView";
import JobFilter from "./JobFilter";
import Section from "../../../Section";

const JobHeader = () => {
  return (
    <Section extraStyles="flex flex-col gap-3 min-[1024px]:gap-0 min-[1024px]:flex-row justify-between py-4.5 items-center">
      <JobFilter />
      <FilterListView />
    </Section>
  );
};

export default JobHeader;
