import { Button, Menu, MenuItem } from "@mui/material";
import { useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
const Workspaces = () => {
  const [anchoEl, setAnchoEl] = useState(null);
  const open = Boolean(anchoEl);
  const handleClick = (event) => {
    setAnchoEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchoEl(null);
  };
  return (
    <div>
      <Button
        id="Button-Workspaces"
        onClick={handleClick}
        aria-controls={open ? "Menu-Workspaces" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined} // (ARIA) Chỉ ra trạng thái mở hoặc đóng của menu.
        sx={{
          fontSize: "0.9rem",
          display: "flex",
          alignItems: "center",
          gap: 0.5,
        }}
      >
        Workspaces
        <ExpandMoreIcon />
      </Button>
      <Menu
        id="Menu-Workspaces"
        onClose={handleClose}
        anchorEl={anchoEl}
        open={open}
      >
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={handleClose}>My account</MenuItem>
        <MenuItem onClick={handleClose}>Logout</MenuItem>
      </Menu>
    </div>
  );
};

export default Workspaces;
