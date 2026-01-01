const VacanciesView = ({
  setView,
  setJobNumberOnPage,
  setSortingType,
}: {
  setJobNumberOnPage: (number: 12 | 16) => void;
  setView: (view: "grid" | "list") => void;
  setSortingType: (type: "oldest" | "newest") => void;
}) => {
  return (
    <div className="flex gap-4">
      <select
        name=""
        id=""
        onChange={(select) =>
          setSortingType(select.target.value as "oldest" | "newest")
        }
      >
        <option value="oldest">Latest</option>
        <option value="newest">Earlier</option>
      </select>
      <select
        name=""
        id=""
        onChange={(val) =>
          setJobNumberOnPage(Number(val.target.value) as 12 | 16)
        }
      >
        <option value="12">12 per page</option>
        <option value="16">16 per page</option>
      </select>
      <ul className="flex gap-2">
        <li>
          <button
            type="button"
            onClick={() => setView("grid")}
            className="p-3 cursor-pointer"
          >
            g
          </button>
        </li>
        <li>
          <button
            type="button"
            onClick={() => setView("list")}
            className="p-3 cursor-pointer"
          >
            l
          </button>
        </li>
      </ul>
    </div>
  );
};

export default VacanciesView;
