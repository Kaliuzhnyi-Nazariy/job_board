import React from "react";
import Section from "../Section";
import { Outlet } from "react-router";

const DashboardLayout = ({
  title,
  children,
  extraStyles = "",
}: {
  title: string;
  extraStyles?: string;
  children: React.ReactNode;
}) => {
  return (
    <Section
      extraStyles={
        "flex flex-col-reverse min-[1024px]:w-246 min-[1440px]:w-full min-[1024px]:mx-auto min-[1440px]:mx-0 min-[1440px]:flex-row " +
        extraStyles
      }
    >
      <div className="flex flex-col mt-3 min-[1024px]:mt-6">
        <h4
          className="uppetcase body_xs_500 text-(--gray4) ml-5 w-full min-[1440px]:w-72 hidden lg:block "
          style={{ marginBottom: 12 }}
        >
          {title}
        </h4>
        {children}
      </div>

      <Outlet />
    </Section>
  );
};

export default DashboardLayout;
