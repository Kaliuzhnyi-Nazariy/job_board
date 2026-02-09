import React from "react";

const InfoItem = ({
  icon,
  amount,
  label,
}: {
  icon: React.ReactNode;
  amount: string;
  label: string;
}) => {
  return (
    <li className="p-5 flex gap-5 bg-white rounded-lg items-center w-78 h-28">
      <div className="p-4 rounded-sm bg-(--primary50)">{icon}</div>
      <div className="">
        <h5>{amount}</h5>
        <p className="mt-1.5 body_medium text-(--gray5)">{label}</p>
      </div>
    </li>
  );
};

export default InfoItem;
