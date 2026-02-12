import { useSelector } from "react-redux";
import Searchbar from "./Searchbar";
import WorkIcon from "@mui/icons-material/Work";
import {
  userId,
  userInitialized,
  userLoading,
} from "../../../features/user/userSelector";
import { Link } from "react-router";

const Header = () => {
  const isUserLoading = useSelector(userLoading);
  const isUserInitialized = useSelector(userInitialized);
  const userIdData = useSelector(userId);

  const isUserLoggedIn =
    !isUserLoading && isUserInitialized && userIdData && userIdData?.length > 0;

  return (
    <div className="px-75 flex py-5 justify-between items-center">
      <div className="flex items-center gap-8">
        <span className="flex gap-2 items-center">
          <WorkIcon className="size-10 text-(--primary5)" />

          <h1 className="logo">MyJob</h1>
        </span>
        <Searchbar />
      </div>
      {!isUserLoggedIn ? (
        <ul className="flex gap-3">
          <li>
            <Link
              to="/auth/signin"
              className="button px-6 py-3 rounded-sm border border-(--primary1) text-(--primary5) hover:border-(--primary6) hover:text-(--primary6) hover:bg-(--primary50) transition-colors duration-150"
            >
              Sign In
            </Link>
          </li>
          <li>
            <Link
              to="/auth/signup"
              className="button px-6 py-3 rounded-sm border border-transparent text-white bg-(--primary5) hover:border-(--primary6) hover:bg-(--primary6) transition-colors duration-150"
            >
              Sign Up
            </Link>
          </li>
        </ul>
      ) : (
        <div className="size-12 rounded-full bg-purple-500"></div>
      )}
    </div>
  );
};

export default Header;
