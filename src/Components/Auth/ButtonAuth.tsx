import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import { useSelector } from "react-redux";
import { userLoading } from "../../../features/user/userSelector";

// import { authLoading } from "../../../features/auth/authSelector";

const ButtonAuth = ({
  isButtonEnabled,
  text,
  extraStlyes,
}: {
  isButtonEnabled?: boolean;
  text: string;
  extraStlyes?: string;
}) => {
  const isLoading = useSelector(userLoading);

  return (
    <button
      type="submit"
      className={
        "py-4 bg-(--primary5) rounded-sm text-white button flex gap-3 items-center justify-center cursor-pointer hover:bg-(--primary6) disabled:bg-(--primary1) disabled:cursor-not-allowed transition-colors duration-150 w-full " +
        (extraStlyes ? extraStlyes : "")
      }
      disabled={!isButtonEnabled || isLoading}
    >
      {isLoading ? (
        "Loading..."
      ) : (
        <>
          <span>{text}</span> <ArrowRightAltIcon />
        </>
      )}
    </button>
  );
};

export default ButtonAuth;
