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
    <li className="p-2 min-[768px]:p-5 flex gap-5 bg-white rounded-lg items-center w-full min-[768px]:w-78 min-[768px]:h-28 h-20 min-w-70 max-[1439px]:justify-self-center min-[1440px]:w-70 min-[1920px]:w-78">
      <div className="p-4 rounded-sm bg-(--primary50)">{icon}</div>
      <div className="">
        <h5>{amount}</h5>
        <p className="min-[768px]:mt-1.5 body_medium text-(--gray5)">{label}</p>
      </div>
    </li>
  );
};

export default InfoItem;
