import PeopleOutlineOutlinedIcon from "@mui/icons-material/PeopleOutlineOutlined";

const CandidatesNumberBadge = ({
  numberOfApplications,
}: {
  numberOfApplications: number;
}) => {
  return (
    <p className="flex items-center gap-2 body_small text-(--gray6)">
      <PeopleOutlineOutlinedIcon className="size-6" />
      {numberOfApplications > 0
        ? numberOfApplications > 1
          ? numberOfApplications + " applcations"
          : numberOfApplications + " application"
        : "No applications"}
    </p>
  );
};

export default CandidatesNumberBadge;
