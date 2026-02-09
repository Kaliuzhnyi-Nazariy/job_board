import type React from "react";
import type { JobApplicatinon } from "../../../../features/application/interfaces";
import { dateFormat } from "../../../helpers";

const ApplicationCard = ({
  ap,
  handleOpen,
  setApplicationId,
}: {
  ap: JobApplicatinon;
  handleOpen: () => void;
  setApplicationId: React.Dispatch<React.SetStateAction<string | null>>;
}) => {
  return (
    <li
      key={ap.id}
      className="w-68 p-4 bg-white border border-(--gray1) rounded-md cursor-pointer"
      onClick={() => {
        handleOpen();
        setApplicationId(ap.id);
      }}
    >
      <div className="flex gap-3 w-full">
        <div className="size-12 bg-(--gray5) rounded-full"></div>
        <div className="">
          <p className="body_small_500">{ap.full_name}</p>
          <span className="mt-1 body_small text-(--gray5)">
            {ap.speciality}
          </span>
        </div>
      </div>
      <hr className="my-4 text-(--gray1)" />
      <ul className="list-disc list-inside text-(--gray6)">
        <li>{ap.experience}</li>
        <li>Education: {ap.education}</li>
        <li>Applied: {dateFormat(ap.applied_at)}</li>
      </ul>
    </li>
  );
};

export default ApplicationCard;
