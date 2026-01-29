import { Box, TextField, MenuItem, Button, Divider } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import LayersIcon from "@mui/icons-material/Layers";
import { jobCategories } from "../../extras/jobCategories";
import { useSearchParams } from "react-router";

import { useForm, type SubmitHandler } from "react-hook-form";
import Section from "../Section";

const FindJobSearchbar = () => {
  const [, setSearchParams] = useSearchParams();

  const { register, handleSubmit, reset } = useForm<{
    title?: string;
    location?: string;
  }>({
    defaultValues: {
      title: "",
      location: "",
    },
  });

  const onHandleSubmit: SubmitHandler<{
    title?: string;
    location?: string;
  }> = (data) => {
    setSearchParams((prev) => {
      const params = new URLSearchParams(prev);

      if (data.title) params.set("title", data.title);
      else params.delete("title");

      if (data.location) params.set("location", data.location);
      else params.delete("location");

      params.set("page", "1");

      reset({
        title: "",
        location: "",
      });

      return params;
    });
  };

  return (
    <Section extraStyles="bg-(--gray50) pt-6 pb-8">
      <h4 className="body_large_500" style={{ marginBottom: "24px" }}>
        Find Job
      </h4>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          bgcolor: "background.paper",
          borderRadius: 1,
          // boxShadow: 1,
          padding: "12px",
          border: "1px solid #767E94",
          width: "1320px",
          height: "80px",
        }}
      >
        {/* Job title */}
        <TextField
          placeholder="Job title, Keyword..."
          variant="standard"
          sx={{
            width: "375px",
            "& .MuiOutlinedInput-root": {
              height: 56,
            },
            "& .MuiOutlinedInput-input": {
              padding: "18px 16px",
            },
          }}
          InputProps={{
            disableUnderline: true,
            startAdornment: <SearchIcon color="primary" sx={{ mr: 1 }} />,
          }}
          {...register("title")}
        />

        <Divider orientation="vertical" flexItem />

        {/* Location */}
        <TextField
          placeholder="Location"
          variant="standard"
          sx={{
            width: "300px",
            "& .MuiOutlinedInput-root": {
              height: 56,
            },
            "& .MuiOutlinedInput-input": {
              padding: "18px 16px",
            },
          }}
          InputProps={{
            disableUnderline: true,
            startAdornment: <LocationOnIcon color="primary" sx={{ mr: 1 }} />,
          }}
          {...register("location")}
        />

        <Divider orientation="vertical" flexItem />

        {/* Category */}
        <TextField
          select
          placeholder="Select Category"
          variant="standard"
          sx={{
            width: "300px",
            "& .MuiOutlinedInput-root": {
              height: 56,
            },
            "& .MuiOutlinedInput-input": {
              padding: "18px 16px",
            },
          }}
          InputProps={{
            disableUnderline: true,
            startAdornment: <LayersIcon color="primary" sx={{ mr: 1 }} />,
          }}
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
          // sx={{
          // color: "text.secondary",
          // cursor: "pointer",
          //   fontSize: 14,
          //   width: "178px",
          //   height: "56px",
          // }}
          sx={{
            width: "178px",
            "& .MuiOutlinedInput-root": {
              height: 56,
            },
            color: "text.secondary",
            cursor: "pointer",
          }}
        >
          Advance Filter
        </Box>

        {/* Find Job */}
        <Button
          variant="contained"
          size="large"
          onClick={handleSubmit(onHandleSubmit)}
          sx={{ ml: "12px", width: "131px", height: 56 }}
        >
          Find Job
        </Button>
      </Box>
    </Section>
  );
};

export default FindJobSearchbar;
