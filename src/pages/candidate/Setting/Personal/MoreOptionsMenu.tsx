import * as React from "react";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";
import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCV } from "../../../../../features/cv/requests";
import { errorToast, successToast } from "../../../../Components/Toasts/Toasts";

const ITEM_HEIGHT = 40;

const MoreOptionsMenu = ({
  handleOpenEdit,
  cvId,
}: {
  handleOpenEdit: () => void;
  cvId: string;
}) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const queryClient = useQueryClient();

  const { mutate: deleteCVMutation } = useMutation({
    mutationKey: ["delteCV"],
    mutationFn: () => deleteCV(cvId),
    onSuccess: () => {
      successToast({ text: "CV deleted!" });
      queryClient.invalidateQueries({ queryKey: ["getCVs"] });
    },
    onError: (err) => {
      errorToast({ text: err.message });
    },
  });

  return (
    <div>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? "long-menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreHorizOutlinedIcon />
      </IconButton>
      <Menu
        id="long-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        slotProps={{
          paper: {
            style: {
              maxHeight: ITEM_HEIGHT * 4.5,
              width: "20ch",
            },
          },
          list: {
            "aria-labelledby": "long-button",
          },
        }}
      >
        <MenuItem
          key="edit"
          onClick={() => {
            handleOpenEdit();
            handleClose();
          }}
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            color: "var(--primary5)",
            ":hover": {
              bgcolor: "var(--primary50)",
            },
          }}
        >
          <BorderColorOutlinedIcon sx={{ fontSize: "20px" }} />
          <p className="body_small_500">Edit Resume</p>
        </MenuItem>

        <MenuItem
          key="delete"
          onClick={() => {
            deleteCVMutation();
            handleClose();
          }}
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            color: "var(--danger5)",
            ":hover": {
              bgcolor: "var(--danger50)",
            },
          }}
        >
          <DeleteForeverOutlinedIcon sx={{ fontSize: "20px" }} />
          <p className="body_small_500">Delete</p>
        </MenuItem>
      </Menu>
    </div>
  );
};

export default MoreOptionsMenu;
