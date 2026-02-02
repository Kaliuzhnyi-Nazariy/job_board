import type { statuses } from "../../features/application/interfaces";

import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";

const ApplicationStatusBadge = ({ status }: { status: statuses }) => {
  return (
    <p
      className={
        `body_small_500 flex gap-1.5 items-center self-center justify-self-center ` +
        (status == "accepted"
          ? "text-(--success5)"
          : status == "rejected"
          ? "text-(--danger5)"
          : "text-(--gray4)")
      }
    >
      {status == "accepted" ? (
        <CheckOutlinedIcon className="size-4" />
      ) : status == "applied" ? (
        <AccessTimeOutlinedIcon className="size-4" />
      ) : (
        <ClearOutlinedIcon className="size-4" />
      )}{" "}
      {status}
    </p>
  );
};

export default ApplicationStatusBadge;
