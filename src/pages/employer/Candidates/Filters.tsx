import TuneOutlinedIcon from "@mui/icons-material/TuneOutlined";
import FilterListView from "../../../Components/FilterListView";
// import { useSearchParams } from "react-router";

const Filters = () => {
  return (
    <div className="flex justify-between items-center py-3">
      <button
        type="button"
        className="hidden min-[768px]:flex gap-3 items-center px-6 py-3 bg-(--primary5) text-white button rounded-sm cursor-not-allowed hover:bg-(--primary6) transition-colors duration-150 "
      >
        <TuneOutlinedIcon className="size-6 rotate-90" /> Filter
      </button>
      <FilterListView />
    </div>
  );
};

export default Filters;
