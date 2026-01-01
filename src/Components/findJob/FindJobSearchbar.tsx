import { Box, TextField, MenuItem, Button, Divider } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import LayersIcon from "@mui/icons-material/Layers";
import { jobCategories } from "../../extras/jobCategories";

const FindJobSearchbar = () => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        bgcolor: "background.paper",
        borderRadius: 1,
        // boxShadow: 1,
        px: 2,
        py: 1,
        gap: 1,
        border: "1px solid #767E94",
      }}
    >
      {/* Job title */}
      <TextField
        placeholder="Job title, Keyword..."
        variant="standard"
        InputProps={{
          disableUnderline: true,
          startAdornment: <SearchIcon color="primary" sx={{ mr: 1 }} />,
        }}
      />

      <Divider orientation="vertical" flexItem />

      {/* Location */}
      <TextField
        placeholder="Location"
        variant="standard"
        InputProps={{
          disableUnderline: true,
          startAdornment: <LocationOnIcon color="primary" sx={{ mr: 1 }} />,
        }}
      />

      <Divider orientation="vertical" flexItem />

      {/* Category */}
      <TextField
        select
        placeholder="Select Category"
        variant="standard"
        InputProps={{
          disableUnderline: true,
          startAdornment: <LayersIcon color="primary" sx={{ mr: 1 }} />,
        }}
        sx={{ minWidth: 180 }}
      >
        {jobCategories.map((cat) => (
          <MenuItem key={cat} value={cat}>
            {cat}
          </MenuItem>
        ))}
      </TextField>

      <Divider orientation="vertical" flexItem />

      {/* Advance Filter */}
      <Box
        sx={{
          color: "text.secondary",
          cursor: "pointer",
          fontSize: 14,
        }}
      >
        Advance Filter
      </Box>

      {/* Find Job */}
      <Button variant="contained" size="large">
        Find Job
      </Button>
    </Box>
  );
};

export default FindJobSearchbar;
