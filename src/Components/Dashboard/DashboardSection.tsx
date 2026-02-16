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
        "mt-5 min-[1440px]:mt-12 min-[1440px]:ml-12 mx-auto max-w-246 w-full " +
        (extraStyles ? extraStyles : "")
      }
    >
      {children}
    </div>
  );
};

export default DashboardSection;
