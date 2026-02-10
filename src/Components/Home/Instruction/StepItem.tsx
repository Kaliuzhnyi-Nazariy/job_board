import React from "react";

const StepItem = ({
  title,
  text,
  icon,
}: {
  title: string;
  text: string;
  icon: React.ReactNode;
}) => {
  return (
    <li className="p-6 rounded-xl group hover:bg-white flex flex-col items-center transition-colors duration-150 hover:cursor-none">
      <div className="p-5 size-18 bg-white rounded-full flex items-center justify-center group-hover:bg-(--primary5) ">
        {icon}
      </div>
      <div className="w-66 mt-6">
        <p className="body_large_500">{title}</p>
        <p className="mt-3 body_small text-(--gray5)">{text}</p>
      </div>
    </li>
  );
};

export default StepItem;
