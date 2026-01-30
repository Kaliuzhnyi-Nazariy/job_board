import { MenuItem, Select } from "@mui/material";
import { useSearchParams } from "react-router";

import ViewCompactIcon from "@mui/icons-material/ViewCompact";
import ViewAgendaIcon from "@mui/icons-material/ViewAgenda";

const VacanciesView = ({
  listView,
  setView,
}: // setJobNumberOnPage,
// setSortingType,
{
  listView: "grid" | "list";
  setJobNumberOnPage: (number: 12 | 16) => void;
  setView: (view: "grid" | "list") => void;
  setSortingType: (type: "oldest" | "newest") => void;
}) => {
  const [searchParams, setSearchParams] = useSearchParams();

  return (
    <div className="flex gap-4 items-center">
      <Select
        // id="demo-simple-select"
        value={searchParams.get("order") || "oldest"}
        onChange={(select) =>
          setSearchParams((prev) => {
            const params = new URLSearchParams(prev);
            params.set("order", select.target.value as string);
            return params;
          })
        }
        className="w-45 h-12"
        sx={{
          "& .MuiOutlinedInput-root": {
            height: 48,
          },
          "& .MuiOutlinedInput-input": {
            padding: "14px 16px 14px 18px",
          },
        }}
      >
        <MenuItem value="oldest">Latest</MenuItem>
        <MenuItem value="newest">Earlier</MenuItem>
      </Select>
      <Select
        // id="demo-simple-select"
        defaultValue={searchParams.get("limit") || 12}
        onChange={(val) =>
          setSearchParams((prev) => {
            const params = new URLSearchParams(prev);
            params.set("limit", val.target.value as "12" | "16");
            return params;
          })
        }
        className="w-45 h-12"
        sx={{
          "& .MuiOutlinedInput-root": {
            height: 48,
          },
          "& .MuiOutlinedInput-input": {
            padding: "14px 16px 14px 18px",
          },
        }}
      >
        <MenuItem value="12">12 per page</MenuItem>
        <MenuItem value="16">16 per page</MenuItem>
      </Select>

      <ul className="flex gap-2 p-2 rounded-md border border-(--gray1) h-12">
        <li className="size-8 flex items-center justify-center">
          <button
            type="button"
            onClick={() => setView("grid")}
            className={
              " w-full h-full cursor-pointer " +
              (listView === "grid" ? "text-black" : "text-(--gray4)")
            }
          >
            <ViewCompactIcon className="size-5" />
          </button>
        </li>
        <li className={"size-8 flex items-center justify-center"}>
          <button
            type="button"
            onClick={() => setView("list")}
            className={
              "w-full h-full cursor-pointer " +
              (listView === "list" ? "text-black" : "text-(--gray4)")
            }
          >
            <ViewAgendaIcon className="size-5" />
          </button>
        </li>
      </ul>
    </div>
  );
};

export default VacanciesView;
