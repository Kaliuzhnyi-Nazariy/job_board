import { Pagination } from "@mui/material";

const PaginationComponent = ({
  pageAmount,
  page,
  setSearchParams,
}: {
  pageAmount: number;
  page: number;
  setSearchParams: React.Dispatch<React.SetStateAction<URLSearchParams>>;
}) => {
  return (
    <Pagination
      className="justify-center w-full grid mt-12"
      count={pageAmount}
      page={page}
      onChange={(_, newPage) => {
        setSearchParams((prev) => {
          const params = new URLSearchParams(prev);
          params.set("page", String(newPage));
          return params;
        });
      }}
      sx={{
        "& .Mui-disabled": {
          color: "#99C2FF",
          bgcolor: "transparent",
        },
        "& .css-1l5xwdx-MuiButtonBase-root-MuiPaginationItem-root.Mui-selected":
          {
            bgcolor: "#0a65cc",
            backgroundColor: "#0a65cc",
            color: "white",
          },
        "& .MuiPaginationItem-previousNext": {
          bgcolor: "#e7f0fa",
          color: "#0a65cc",
        },
      }}
    />
  );
};

export default PaginationComponent;
