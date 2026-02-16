import PeopleOutlineOutlinedIcon from "@mui/icons-material/PeopleOutlineOutlined";

const CandidatesNumberBadge = ({
  numberOfApplications,
}: {
  numberOfApplications: number;
}) => {
  return (
    <span className="flex items-center gap-2 body_small text-(--gray6) justify-self-center">
      <PeopleOutlineOutlinedIcon className="size-6" />
      <p className="hidden min-[768px]:block">
        {numberOfApplications > 0
          ? numberOfApplications > 1
            ? numberOfApplications + " applcations"
            : numberOfApplications + " application"
          : "No applications"}
      </p>
      <p className="min-[768px]:hidden">({numberOfApplications})</p>
    </span>
  );
};

export default CandidatesNumberBadge;
