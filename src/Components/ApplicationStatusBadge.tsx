import type { statuses } from "../../features/application/interfaces";

import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";

const ApplicationStatusBadge = ({ status }: { status: statuses }) => {
  return (
    <span
      className={
        `body_small_500 flex gap-1.5 items-center self-center justify-self-center ` +
        (status == "accepted"
          ? "text-(--success5)"
          : status == "rejected"
          ? "text-(--danger5)"
          : "text-(--gray4)")
      }
    >
      <span className="hidden min-[640px]:block ">
        {" "}
        {status == "accepted" ? (
          <CheckOutlinedIcon className="size-2 min-[1024px]:size-4" />
        ) : status == "applied" ? (
          <AccessTimeOutlinedIcon className="size-2 min-[1024px]:size-4" />
        ) : (
          <ClearOutlinedIcon className="size-2 min-[1024px]:size-4" />
        )}
      </span>{" "}
      <p>{status}</p>
    </span>
  );
};

export default ApplicationStatusBadge;
