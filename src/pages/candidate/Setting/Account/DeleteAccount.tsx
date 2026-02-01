import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import { useAppDispatch } from "../../../../../features/hooks/dispatchHook";
import { deleteAccount } from "../../../../../features/user/userRequest";

const DeleteAccount = () => {
  const dispatch = useAppDispatch();

  const handleDelete = async () => {
    await dispatch(deleteAccount());
  };

  return (
    <div className="w-1/2">
      <h6 className="body_large_500">Delete Your Account</h6>
      <article className="mt-3 w-full">
        If you delete your Jobpilot account, you will no longer be able to get
        information about the matched jobs, following employers, and job alert,
        shortlisted jobs and more. You will be abandoned from all the services
        of Jobpilot.com.
      </article>
      <button
        type="button"
        className="text-(--danger5) flex gap-2 body_small_500 mt-5 items-center cursor-pointer"
        onClick={handleDelete}
      >
        <CancelOutlinedIcon className="size-6" /> Close Account
      </button>
    </div>
  );
};

export default DeleteAccount;
