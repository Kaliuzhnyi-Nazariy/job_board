import Searchbar from "./Searchbar";
import WorkIcon from "@mui/icons-material/Work";

const Header = () => {
  return (
    <div className="px-75 flex py-5 justify-between items-center">
      <div className="flex items-center gap-8">
        <span className="flex gap-2 items-center">
          <WorkIcon className="size-10 text-(--primary5)" />

          <h1 className="logo">MyJob</h1>
        </span>
        <Searchbar />
      </div>
      <div className="size-12 rounded-full bg-purple-500"></div>
    </div>
  );
};

export default Header;
