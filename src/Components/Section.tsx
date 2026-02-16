import React from "react";

const Section = ({
  children,
  extraStyles,
}: {
  children: React.ReactNode;
  extraStyles?: string;
}) => {
  return (
    <section
      className={`px-3 min-[428px]:px-6 min-[1024px]:px-8 min-[1440px]:px-22 min-[1920px]:px-75 ${
        extraStyles ? extraStyles : ""
      }`}
    >
      {children}
    </section>
  );
};

export default Section;
