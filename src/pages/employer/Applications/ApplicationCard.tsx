import type React from "react";

const ApplicationCard = ({
  ap,
  handleOpen,
  setApplicationId,
}: {
  ap: any;
  handleOpen: () => void;
  setApplicationId: React.Dispatch<React.SetStateAction<number | null>>;
}) => {
  return (
    <li
      key={ap.id}
      className="w-60 "
      onClick={() => {
        handleOpen();
        setApplicationId(ap.id);
      }}
    >
      <div className="w-full flex justify-between">
        <h2 className="font-bold">{ap.full_name}</h2>
        <span className="opacity-50">{ap.speciality}</span>
      </div>

      <hr />

      <ul className="list-[inside]">
        <li>{ap.experience}</li>
        <li>Education: {ap.education}</li>
        <li>Applied: {ap.applied_at}</li>
      </ul>
    </li>
  );
};

export default ApplicationCard;
