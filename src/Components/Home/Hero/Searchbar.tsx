import SearchIcon from "@mui/icons-material/Search";
import LocationOnIcon from "@mui/icons-material/LocationOn";

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

import { useSelector } from "react-redux";
import { userRole } from "../../../../features/user/userSelector";
import { useNavigate } from "react-router";
import { Button, Divider } from "@mui/material";
import { useForm, type SubmitHandler } from "react-hook-form";

const Searchbar = () => {
  const userrole = useSelector(userRole);

  // const [, setSearchParams] = useSearchParams();

  const navigate = useNavigate();

  const { register, handleSubmit, reset } = useForm<{
    title?: string;
    location?: string;
    search?: string;
  }>({
    defaultValues: {
      title: "",
      location: "",
      search: "",
    },
  });

  const onHandleSubmit: SubmitHandler<{
    title?: string;
    location?: string;
    search?: string;
  }> = (data) => {
    if (!userrole) {
      return navigate("/auth/signin");
    }

    const params = new URLSearchParams();

    if (userrole === "candidate") {
      if (data.title) params.set("title", data.title);
      if (data.location) params.set("location", data.location);
    } else {
      if (data.search) params.set("search", data.search);
    }

    params.set("page", "1");

    const basePath =
      userrole === "candidate" ? "/candidate/find-job" : "/employer/candidates";

    navigate(`${basePath}?${params.toString()}`);

    reset({
      title: "",
      location: "",
    });
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        bgcolor: "background.paper",
        borderRadius: 1,
        // boxShadow: 1,
        padding: "12px",
        border: "1px solid var(--gray1)",
        width: "679px",
        height: "80px",
        marginTop: "32px",
      }}
    >
      {/* Job title */}
      {userrole === "candidate" ? (
        <TextField
          placeholder={
            userrole == "candidate"
              ? "Job title, keyword, company"
              : "Candidate name, position..."
          }
          variant="standard"
          sx={{
            width: "288px",
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
      ) : (
        <TextField
          placeholder={
            userrole == "candidate"
              ? "Job title, keyword, company"
              : "Candidate name, position..."
          }
          variant="standard"
          sx={{
            width: "288px",
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
          {...register("search")}
        />
      )}

      <Divider orientation="vertical" flexItem />

      {/* Location */}
      <TextField
        placeholder="Location"
        variant="standard"
        sx={{
          width: "224px",
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
  );
};

export default Searchbar;
