import { Link } from "react-router";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import Section from "../../Components/Section";

const NotFound = () => {
  return (
    <Section extraStyles="flex flex-col h-screen justify-center items-center text-center ">
      <img
        src="NotFoundIllustration.png"
        className="w-50 h-37.5 min-[768px]:w-100 min-[768px]:h-75 min-[1440px]:w-200 min-[1440px]:h-150"
      />
      <h1>Opps! Page not found</h1>
      <p className="bidy_large text-(--gray7) mt-6">
        Something went wrong. It's look like the link is broken or the page is
        removed.
      </p>

      <Link
        to="/"
        className="py-4 px-8 bg-(--primary5) rounded-sm text-white button flex gap-3 items-center justify-center cursor-pointer hover:bg-(--primary6) disabled:bg-(--primary1) disabled:cursor-not-allowed transition-colors duration-150 max-[767px]:w-full mt-8"
      >
        Home <ArrowRightAltIcon />
      </Link>
    </Section>
  );
};

export default NotFound;
