import { Button, Menu, MenuItem } from "@mui/material";
import { useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
const Templates = () => {
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
        id="Button-Templates"
        onClick={handleClick}
        aria-controls={open ? "Menu-Templates" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : "false"} // (ARIA) Chỉ ra trạng thái mở hoặc đóng của menu.
        sx={{ fontSize: "0.9rem", color: "white" }}
      >
        Templates
        <ExpandMoreIcon />
      </Button>
      <Menu
        id="Menu-Templates"
        open={open}
        onClose={handleClose}
        anchorEl={anchoEl}
        MenuListProps={{
          "aria-labelledby": "Button-Templates",
        }}
      >
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={handleClose}>My account</MenuItem>
        <MenuItem onClick={handleClose}>Logout</MenuItem>
      </Menu>
    </div>
  );
};

export default Templates;
