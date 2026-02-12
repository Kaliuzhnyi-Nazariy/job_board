import ArrowRightAltOutlinedIcon from "@mui/icons-material/ArrowRightAltOutlined";
import { Link } from "react-router";

const FooterNavigation = ({
  title,
  linkTo,
}: {
  title: string;
  linkTo?: string;
}) => {
  return (
    <li
      className={`y-1.5   ${linkTo ? "cursor-pointer" : "cursor-not-allowed"}`}
    >
      {linkTo ? (
        <Link
          to={linkTo}
          className="transition-all duration-150 flex items-center gap-2 group hover:font-medium hover:text-white "
        >
          <ArrowRightAltOutlinedIcon
            className="opacity-0 -translate-x-4 
               transition-all duration-150
               group-hover:opacity-100 
               group-hover:translate-x-0"
          />{" "}
          <span className="-translate-x-8 group-hover:translate-x-0">
            {title}
          </span>
        </Link>
      ) : (
        <span className="flex items-center gap-2 text-(--gray5)">{title}</span>
      )}
    </li>
  );
};

export default FooterNavigation;

// <>
//   <ArrowRightAltOutlinedIcon
//     className="opacity-0 -translate-x-4
//        transition-all duration-150
//        group-hover:opacity-100
//        group-hover:translate-x-0"
//   />{" "}
//   <span className="-translate-x-8 group-hover:translate-x-0">
//     {title}
//   </span>
// </>;
