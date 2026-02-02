import React from "react";

const DashboardSection = ({
  children,
  extraStyles,
}: {
  children: React.ReactNode;
  extraStyles?: string;
}) => {
  return (
    <div
      className={
        "mt-12 ml-12 max-w-246 w-full " + (extraStyles ? extraStyles : "")
      }
    >
      {children}
    </div>
  );
};

export default DashboardSection;
