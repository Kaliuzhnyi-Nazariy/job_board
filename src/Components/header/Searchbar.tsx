import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import MenuItem from "@mui/material/MenuItem";
import SearchIcon from "@mui/icons-material/Search";
import Box from "@mui/material/Box";
import { countries } from "../../extras/countries";
import { useLocation, useNavigate, useSearchParams } from "react-router";
import { useSelector } from "react-redux";
import { userRole } from "../../../features/user/userSelector";

const Searchbar = () => {
  const userrole = useSelector(userRole);

  const { pathname } = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  const searchValue = searchParams.get("search");

  const navigate = useNavigate();

  const handleCountryChange = (country: string) => {
    if (userrole === "candidate") {
      if (pathname !== "/candidate/find-job") {
        navigate({
          pathname: "/candidate/find-job",
          // search: `?location=${country}`,
        });
        return;
      }

      setSearchParams((prev) => {
        const params = new URLSearchParams(prev);
        params.set("location", country);
        return params;
      });
    } else {
      if (pathname !== "/employer/candidates") {
        navigate({
          pathname: "/employer/candidates",
          search: `?location=${country}`,
        });
        return;
      }

      setSearchParams((prev) => {
        const params = new URLSearchParams(prev);
        params.set("location", country);
        return params;
      });
    }
  };

  const handleJobChange = (job: string) => {
    if (userrole === "candidate") {
      if (pathname !== "/candidate/find-job") {
        navigate({
          pathname: "/candidate/find-job",
          // search: `?title=${job}`,
        });
        return;
      }

      setSearchParams((prev) => {
        const params = new URLSearchParams(prev);
        params.set("title", job);
        return params;
      });
    } else {
      if (pathname !== "/employer/candidates") {
        navigate({
          pathname: "/employer/candidates",
          // search: `?search=${job}`,
        });
        return;
      }

      setSearchParams((prev) => {
        const params = new URLSearchParams(prev);
        params.set("search", job);
        return params;
      });
    }
  };

  return (
    <Box
      sx={{
        // width: "100%",
        width: 668,
        height: 50,
        padding: 0,
        borderColor: "#e4e5e8",
        borderRadius: 5,
      }}
    >
      <TextField
        fullWidth
        placeholder={
          userrole == "candidate"
            ? "Job title, keyword, company"
            : "Candidate name, position..."
        }
        sx={{
          "& .MuiOutlinedInput-root": {
            height: 50,
          },
          "& .MuiOutlinedInput-input": {
            padding: "12px 8px",
          },
        }}
        variant="outlined"
        value={searchValue}
        onChange={(e) => handleJobChange(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              {/* Country select */}
              <TextField
                select
                variant="standard"
                defaultValue="Poland"
                InputProps={{ disableUnderline: true }}
                sx={{
                  minWidth: 100,
                }}
                onChange={(e) => handleCountryChange(e.target.value)}
              >
                {countries.map((country) => (
                  <MenuItem key={country} value={country}>
                    {country}
                  </MenuItem>
                ))}
              </TextField>

              {/* Divider */}
              <Box
                sx={{
                  height: 24,
                  width: "1px",
                  bgcolor: "divider",
                  mx: 1,
                }}
              />

              {/* Search icon */}
              <SearchIcon sx={{ color: "primary.main" }} />
            </InputAdornment>
          ),
        }}
      />
    </Box>
  );
};

export default Searchbar;
