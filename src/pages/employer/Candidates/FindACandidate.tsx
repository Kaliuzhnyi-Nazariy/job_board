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

  const pageAmount = Math.ceil(data.meta.total / data.meta.limit);

  const listStyleView = "flex flex-col gap-3 min-[1440px]:gap-6";
  const gridListView = `grid grid-cols-1 min-[425px]:grid-cols-2 ${
    limit == 12
      ? "min-[1024px]:grid-cols-3 gap-3 "
      : "min-[1024px]:grid-cols-4 gap-2 "
  } grid-rows-4 `;

  const photoStyles = `${
    listView === "list"
      ? "min-[768px]:size-24 min-[425px]:block min-[425px]:size-16 shrink-0"
      : listView === "grid" && limit === 12
      ? "min-[768px]:size-24 min-[425px]:block min-[425px]:size-16"
      : "min-[768px]:size-24 min-[1024px]:size-12 min-[425px]:block min-[425px]:size-16"
  }`;

  const extraData = `${
    listView === "list"
      ? " min-[1440px]:gap-4 "
      : listView == "grid" && limit == 12
      ? " min-[1440px]:gap-2 "
      : "flex-col min-[1440px]:gap-4"
  }`;

  return (
    <Section>
      {/* <h1>Find A Candidate</h1> */}
      <Filters />
      <div className="grid min-[1440px]:grid-cols-[424px_1fr] gap-6 mt-5 ">
        <div className="hidden min-[1440px]:block w-106 h-302 bg-amber-500"></div>
        {data && data.data.length > 0 ? (
          <ul className={listView === "grid" ? gridListView : listStyleView}>
            {data.data.map((c: ICandidateData) => {
              return (
                <li
                  key={c.id}
                  className={`p-3 min-[1440px]:p-6 flex justify-between items-center border border-(--gray1) rounded-xl ${
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
                      className={`${photoStyles} hidden rounded-lg bg-(--gray5)`}
                    ></div>
                    <div className={"flex flex-col gap-5 w-full "}>
                      <div
                        className={
                          `flex flex-col gap-1.5 ` +
                          (listView == "list" ? "" : "items-center")
                        }
                      >
                        {/* <span className="flex gap-1 items-center"> */}
                        <h3 className="body_large_500">{c.full_name}</h3>
                        <h4 className="body_small text-(--gray6)">{c.role}</h4>
                        {/* </span> */}

                        {/* <div className="flex gap-4 mt-5"> */}
                        <div
                          className={
                            `flex  min-[768px]:flex-row min-[768px]:mt-5 gap-2 ${extraData}` +
                            (listView === "list" ? "flex-col mt-1" : "flex-row")
                          }
                        >
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
                    <span className="inline-flex gap-1">
                      <span>View</span>{" "}
                      <span className="hidden min-[768px]:block"> Profile</span>
                    </span>
                    <ArrowRightAltOutlinedIcon
                      sx={{
                        display: "none",
                        "@media (min-width: 768px)": {
                          display: "block",
                        },
                      }}
                      className="hidden min-[768px]:block"
                    />
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
