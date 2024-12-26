import { Button, Menu, MenuItem } from "@mui/material";
import { useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
const Starred = () => {
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
        id="Button-Starred"
        onClick={handleClick}
        aria-controls={open ? "Menu-Starred" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : "false"} // (ARIA) Chỉ ra trạng thái mở hoặc đóng của menu.
        sx={{
          fontSize: "0.9rem",
          display: "flex",
          alignItems: "center",
          gap: 0.5,
          color: "white",
        }}
      >
        Starred
        <ExpandMoreIcon />
      </Button>
      <Menu
        id="Menu-Starred"
        open={open}
        onClose={handleClose}
        anchorEl={anchoEl}
        MenuListProps={{
          "aria-labelledby": "Button-Starred",
        }}
      >
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={handleClose}>My account</MenuItem>
        <MenuItem onClick={handleClose}>Logout</MenuItem>
      </Menu>
    </div>
  );
};

export default Starred;
