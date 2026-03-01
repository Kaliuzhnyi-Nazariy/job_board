import { Link } from "react-router";

const LinkButton = ({
  link,
  buttonText,
  extraStyles,
  type = "accent",
  children,
}: {
  link: string;
  buttonText?: string;
  extraStyles?: string;
  type?: "accent" | "outlined";
  children?: React.ReactNode;
}) => {
  const buttonStyles =
    type && type == "accent"
      ? "button px-6 py-3 rounded-sm border border-transparent text-white bg-(--primary5) hover:border-(--primary6) hover:bg-(--primary6) transition-colors duration-150"
      : "button px-6 py-3 rounded-sm border border-(--primary1) text-(--primary5) hover:border-(--primary6) hover:text-(--primary6) hover:bg-(--primary50) transition-colors duration-150";

  return (
    <Link to={link} className={buttonStyles + (extraStyles ? extraStyles : "")}>
      {children ? children : buttonText}
    </Link>
  );
};

export default LinkButton;
