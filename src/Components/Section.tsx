import React from "react";

const Section = ({
  children,
  extraStyles,
}: {
  children: React.ReactNode;
  extraStyles?: string;
}) => {
  return (
    <section className={`px-75 ${extraStyles ? extraStyles : ""}`}>
      {children}
    </section>
  );
};

export default Section;
