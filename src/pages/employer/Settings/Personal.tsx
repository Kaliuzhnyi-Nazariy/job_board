import { useAppDispatch } from "../../../../features/hooks/dispatchHook";
import { deleteAccount } from "../../../../features/user/userRequest";
import DashboardSection from "../../../Components/Dashboard/DashboardSection";
import { errorToast, successToast } from "../../../Components/Toasts/Toasts";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";

const Personal = () => {
  const dispatch = useAppDispatch();

  const handleDelete = async () => {
    try {
      await dispatch(deleteAccount()).unwrap();
      successToast({ text: "Account was deleted!" });
    } catch (error) {
      errorToast({
        text:
          (error as { message: string }).message || "Account is not deleted!",
      });
    }
  };
  return (
    <DashboardSection>
      <div className="min-[1024px]:w-1/2">
        <h6 className="body_large_500">Delete Your Account</h6>
        <article className="mt-3 w-full">
          If you delete your Jobpilot account, you will no longer be able to get
          information about the matched jobs, following employers, and job
          alert, shortlisted jobs and more. You will be abandoned from all the
          services of Jobpilot.com.
        </article>
        <button
          type="button"
          className="text-(--danger5) flex gap-2 body_small_500 mt-5 items-center cursor-pointer"
          onClick={handleDelete}
        >
          <CancelOutlinedIcon className="size-6" /> Close Account
        </button>
      </div>
    </DashboardSection>
  );
};

export default Personal;
