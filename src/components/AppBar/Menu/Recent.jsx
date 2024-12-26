import {
  Cloud,
  ContentCopy,
  ContentCut,
  ContentPaste,
} from "@mui/icons-material";
import {
  Button,
  Divider,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import { useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
const Recent = () => {
  const [anchorEl, setAnchoEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchoEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchoEl(null);
  };
  return (
    <div>
      <Button
        id="Button-Rencent"
        onClick={handleClick}
        aria-controls={open ? "Menu-Rencent" : undefined} // Xác định rằng nó kiểm soát phần tử có ID
        aria-haspopup="true" // true: Cho biết rằng nút này sẽ mở ra một menu khi được nhấp vào
        aria-expanded={open ? "true" : "false"} // Chỉ ra trạng thái mở hoặc đóng của menu.
        sx={{
          fontSize: "0.9rem",
          display: "flex",
          alignItems: "center",
          gap: 0.5,
          color: "white",
        }}
      >
        Rencent
        <ExpandMoreIcon />
      </Button>
      <Menu
        id="Menu-Rencent"
        open={open}
        onClose={handleClose}
        anchorEl={anchorEl}
        MenuListProps={{
          "aria-labelledby": "Button-Rencent",
        }}
      >
        <MenuItem>
          <ListItemIcon>
            <ContentCut fontSize="small" />
          </ListItemIcon>
          <ListItemText>Cut</ListItemText>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            ⌘X
          </Typography>
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <ContentCopy fontSize="small" />
          </ListItemIcon>
          <ListItemText>Copy</ListItemText>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            ⌘C
          </Typography>
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <ContentPaste fontSize="small" />
          </ListItemIcon>
          <ListItemText>Paste</ListItemText>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            ⌘V
          </Typography>
        </MenuItem>
        <Divider />
        <MenuItem>
          <ListItemIcon>
            <Cloud fontSize="small" />
          </ListItemIcon>
          <ListItemText>Web Clipboard</ListItemText>
        </MenuItem>
      </Menu>
    </div>
  );
};

export default Recent;
