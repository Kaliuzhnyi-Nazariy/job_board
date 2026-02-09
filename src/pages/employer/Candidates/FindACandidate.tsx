import { useQuery } from "@tanstack/react-query";
import { getCandidates } from "../../../../features/candidate/candidatesRequsts";
import { Link, useSearchParams } from "react-router";
import type {
  // ICandidate,
  ICandidateData,
} from "../../../../features/candidate/interfaces";
import Section from "../../../Components/Section";
import Filters from "./Filters";

import LocationOnIcon from "@mui/icons-material/LocationOn";
import AttachMoneyOutlinedIcon from "@mui/icons-material/AttachMoneyOutlined";
import ArrowRightAltOutlinedIcon from "@mui/icons-material/ArrowRightAltOutlined";
import PaginationComponent from "../../../Components/Pagination";

const FindACandidate = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const search = searchParams.get("search")?.trim() || "";
  const location = searchParams.get("location")?.trim() || "";

  const orderParams = searchParams.get("order") || "oldest";
  const page = Number(searchParams.get("page")) || 1;
  const limit = Number(searchParams.get("limit")) || 12;
  const listView = searchParams.get("list-view") || "grid";

  const order = orderParams === "newest" ? "DESC" : "ASC";

  const { data, isLoading, isError } = useQuery({
    queryKey: ["candidates", search, location, order],
    queryFn: () => getCandidates(limit, search, location, order),
  });

  if (isLoading) return <p>Searching for candidates</p>;

  if (isError) return <p>Candidates not found!</p>;

  console.log({ data });

  const pageAmount = Math.ceil(data.meta.total / data.meta.limit);

  const listStyleView = "flex flex-col gap-6";
  const gridListView = `grid ${
    limit == 12 ? "grid-cols-3 gap-3 " : "grid-cols-4 gap-2 "
  } grid-rows-4 `;

  const photoStyles = `${
    listView === "list"
      ? "size-24"
      : listView === "grid" && limit === 12
      ? "size-24"
      : "size-12"
  }`;

  const extraData = `${
    listView === "list"
      ? " gap-4 "
      : listView == "grid" && limit == 12
      ? " gap-2 "
      : "flex-col gap-4"
  }`;

  return (
    <Section>
      {/* <h1>Find A Candidate</h1> */}
      <Filters />
      <div className="grid grid-cols-[424px_1fr] gap-6 mt-5 ">
        <div className="w-106 h-302 bg-amber-500"></div>
        {data && data.data.length > 0 ? (
          <ul className={listView === "grid" ? gridListView : listStyleView}>
            {data.data.map((c: ICandidateData) => {
              return (
                <li
                  key={c.id}
                  className={`p-6 flex justify-between items-center border border-(--gray1) rounded-xl ${
                    listView === "grid" && "flex-col"
                  }`}
                >
                  <div
                    className={`flex gap-5 ${
                      listView === "grid" && "flex-col items-center"
                    }`}
                  >
                    {/* <div className="flex flex-col gap-5"> */}
                    {/* <div className="size-24 rounded-lg bg-(--gray5)"></div> */}
                    <div
                      className={`${photoStyles} rounded-lg bg-(--gray5)`}
                    ></div>
                    <div className={"flex flex-col gap-5"}>
                      <div className="flex flex-col gap-1.5">
                        <h3 className="body_large_500">{c.full_name}</h3>
                        <h4 className="body_small text-(--gray6)">{c.role}</h4>

                        {/* <div className="flex gap-4 mt-5"> */}
                        <div className={`flex  mt-5 ${extraData}`}>
                          <p className="flex items-center">
                            <LocationOnIcon className="size-5.5 text-(--gray2)" />
                            <span className="body_small text-(--gray6)">
                              {c.location || "No location"}
                            </span>
                          </p>

                          <p className="flex items-center">
                            <AttachMoneyOutlinedIcon className="size-5.5 text-(--gray2)" />
                            <span className="body_small text-(--gray6)">
                              {c.experience || "No experience"}
                            </span>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <Link
                    to={`/employer/candidates/${c.id}`}
                    className={`flex items-center gap-3 text-(--primary5) button bg-(--primary50) px-6 py-3 rounded-sm ${
                      listView === "grid" && "mt-5"
                    }`}
                  >
                    View Profile <ArrowRightAltOutlinedIcon />
                  </Link>
                </li>
              );
            })}
          </ul>
        ) : (
          <p>No candidate found!</p>
        )}
      </div>

      <PaginationComponent
        page={page}
        pageAmount={pageAmount}
        setSearchParams={setSearchParams}
      />
    </Section>
  );
};

export default FindACandidate;
