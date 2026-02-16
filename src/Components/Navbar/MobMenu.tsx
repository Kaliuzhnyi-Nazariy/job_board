import { Link } from "react-router";
import LinkButton from "../LinkButton";
import { useSelector } from "react-redux";
import { userRole } from "../../../features/user/userSelector";

const MobMenu = ({
  isOpen,
  closeMenu,
}: {
  isOpen: boolean;
  closeMenu: () => void;
}) => {
  const userrole = useSelector(userRole);

  // find
  const findRoute =
    userrole == "candidate" ? "/candidate/find-job" : "/employer/candidates";
  const findText = userrole == "candidate" ? "Find Job" : "Find Candidate";

  // dashboard
  const dashboardRoute =
    userrole === "candidate" ? "/candidate/dashboard" : "/employer/dashboard";

  // style
  const liItem = "py-4 border-b border-b-(--gray1)";

  // block scrolling
  if (isOpen) {
    document.body.classList.add("disable_scrolling");
  }

  const handleClose = () => {
    closeMenu();
    document.body.classList.remove("disable_scrolling");
  };

  return (
    <div
      className={`z-1 fixed ${
        isOpen ? "top-12" : "-top-full"
      } left-0 h-full w-full bg-(--gray9) transition-all duration-200 min-[1024px]:hidden`}
      onClick={handleClose}
    >
      <div className="p-6 bg-white rounded-b-2xl">
        <ul className="">
          <li className={liItem}>
            <Link to="/" onClick={handleClose}>
              Home
            </Link>
          </li>

          <li className={liItem}>
            <Link to={findRoute} onClick={handleClose}>
              {findText}
            </Link>
          </li>
          <li className={liItem}>
            <Link to={dashboardRoute} onClick={handleClose}>
              Dashboard
            </Link>
          </li>
        </ul>

        {!userrole ? (
          <ul className="flex gap-8 flex-col min-[425px]:flex-row list-none min-[425px]:gap-3 mt-8 ">
            <li>
              <LinkButton link="/auth/signup" buttonText="Create Account" />
            </li>
            <li>
              <LinkButton
                link="/auth/signin"
                buttonText="Sign In"
                type="outlined"
              />
            </li>
          </ul>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default MobMenu;
