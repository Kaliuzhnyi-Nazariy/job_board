// import { countries } from "../../extras/countries";
// import TextField from "@mui/material/TextField";
// import InputAdornment from "@mui/material/InputAdornment";
// import SearchIcon from "@mui/icons-material/Search";

// const Searchbar = () => {
//   console.log(countries.map);
//   return (
//     <div className="">
//       <select>
//         {countries.map((country) => {
//           return <option value={country}>{country}</option>;
//         })}
//       </select>
//       {/* <input type="text" /> */}
//       <TextField
//         id="outlined-basic"
//         InputProps={{
//           startAdornment: (
//             <InputAdornment position="start">
//               <SearchIcon />
//             </InputAdornment>
//           ),
//         }}
//         variant="outlined"
//       ></TextField>
//       <div className="size-6 bg-purple-500"></div>
//       <div className="size-12 bg-purple-500"></div>
//     </div>
//   );
// };

// export default Searchbar;

import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import MenuItem from "@mui/material/MenuItem";
import SearchIcon from "@mui/icons-material/Search";
import Box from "@mui/material/Box";
import { countries } from "../../extras/countries";
import { useLocation, useNavigate, useSearchParams } from "react-router";

const Searchbar = () => {
  const { pathname } = useLocation();
  const [, setSearchParams] = useSearchParams();

  const navigate = useNavigate();

  const handleCountryChange = (country: string) => {
    if (pathname !== "/candidate/find-job") {
      navigate({
        pathname: "/candidate/find-job",
        search: `?location=${country}`,
      });
      return;
    }

    setSearchParams((prev) => {
      const params = new URLSearchParams(prev);
      params.set("location", country);
      return params;
    });
  };

  const handleJobChange = (job: string) => {
    if (pathname !== "/candidate/find-job") {
      navigate({
        pathname: "/candidate/find-job",
        search: `?title=${job}`,
      });
      return;
    }

    setSearchParams((prev) => {
      const params = new URLSearchParams(prev);
      params.set("title", job);
      return params;
    });
  };

  return (
    <Box sx={{ width: "100%", maxWidth: 700 }}>
      <TextField
        fullWidth
        placeholder="Job title, keyword, company"
        variant="outlined"
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
                  mr: 1,
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
