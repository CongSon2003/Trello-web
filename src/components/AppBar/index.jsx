import {
  Badge,
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import ModeSelect from "~/components/ModeSelect";
import AppsIcon from "@mui/icons-material/Apps";
import TrelloIcon from "../../assets/trello.svg?react";
import { SvgIcon } from "@mui/material";
import Workspaces from "./Menu/Workspaces";
import Recent from "./Menu/Recent";
import Starred from "./Menu/Starred";
import Templates from "./Menu/Templates";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import Tooltip from "@mui/material/Tooltip";
import Profile from "./Menu/Profile";
import { useEffect, useRef, useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
const AppBar = () => {
  const [anchoEl, setAnchoEl] = useState(null);
  const open = Boolean(anchoEl);
  const handleClick = (event) => {
    setAnchoEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchoEl(null);
  };
  const [isActive, setIsActive] = useState(false); // Trạng thái kích thước
  const boxRef = useRef(null); // Ref để lưu trữ tham chiếu đến Box

  const handleClickInside = () => {
    setIsActive(true);
  };

  // Hàm xử lý click ra ngoài
  const handleClickOutside = (event) => {
    // Kiểm tra xem boxRef.current có tồn tại trước khi gọi contains
    if (boxRef.current && !boxRef.current.contains(event.target)) {
      setIsActive(false); // Thiết lập trở về bình thường (kích thước nhỏ)
    }
  };

  useEffect(() => {
    // Gắn sự kiện click vào document
    document.addEventListener("mousedown", handleClickOutside);

    // Dọn dẹp sự kiện khi component bị unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  console.log(window.innerHeight);
  return (
    <Box
      sx={{
        height: (theme) => theme.Trello.appBarHeight,
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        paddingX: 2,
        gap: 2,
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
        <AppsIcon fontSize="medium" sx={{ color: "primary.main" }} />
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
          <Button sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
            <SvgIcon
              component={TrelloIcon}
              inheritViewBox
              fontSize="small"
              sx={{ color: "primary.main" }}
            />
            <Typography
              variant="span"
              sx={{
                fontSize: "1rem",
                fontWeight: "Bold",
                color: "primary.main",
              }}
            >
              Trello
            </Typography>
          </Button>
        </Box>
        <Box
          sx={{
            display: { xs: "none", md: "flex" },
            alignItems: "center",
            gap: 1,
          }}
        >
          <Workspaces />
          <Box sx={{ display: { lg: "flex", md: "none" } }}>
            <Recent />
            <Starred />
            <Templates />
          </Box>
          <Box sx={{ display: { lg: "none", md: "flex" } }}>
            <Button
              id="Button-More"
              onClick={handleClick}
              aria-controls={open ? "Menu-More" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : "false"} // (ARIA) Chỉ ra trạng thái mở hoặc đóng của menu.
              sx={{ fontSize: "0.9rem" }}
            >
              More
              <ExpandMoreIcon />
            </Button>
            <Menu
              id="Menu-More"
              open={open}
              onClose={handleClose}
              anchorEl={anchoEl}
              MenuListProps={{
                "aria-labelledby": "Button-More",
              }}
            >
              <MenuItem onClick={handleClose}>Rencent</MenuItem>
              <MenuItem onClick={handleClose}>Starred</MenuItem>
              <MenuItem onClick={handleClose}>Template</MenuItem>
            </Menu>
          </Box>
          <Button
            variant="outlined"
            sx={{ backgroundColor: "#0C66E4", color: "white" }}
          >
            Create
          </Button>
        </Box>
      </Box>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <TextField
          id="outlined-search"
          label="Search..."
          size="small"
          type="search"
          sx={{
            minWidth: isActive
              ? window.innerWidth < 1300
                ? "50%"
                : "39%"
              : "200px",
            width: "200px",
            display: { xs: "none", sm: "flex" },
            position: "absolute",
            right: "270px",
            zIndex: 10,
            boxShadow: 0,
            backgroundColor: "white",
            borderRadius: 1,
          }}
          ref={boxRef}
          onClick={handleClickInside}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: "primary.main" }} />
              </InputAdornment>
            ),
          }}
        />
        <Tooltip title="Search" sx={{ display: { xs: "flex", sm: "none" } }}>
          <IconButton>
            <SearchIcon sx={{ color: "primary.main" }} />
          </IconButton>
        </Tooltip>
        <ModeSelect />
        <Tooltip title="Notifications">
          <Badge color="secondary" variant="dot">
            <IconButton>
              <NotificationsNoneIcon sx={{ color: "primary.main" }} />
            </IconButton>
          </Badge>
        </Tooltip>
        <Tooltip title="Information">
          <IconButton>
            <HelpOutlineIcon sx={{ color: "primary.main" }} />
          </IconButton>
        </Tooltip>
        <Profile />
      </Box>
    </Box>
  );
};

export default AppBar;
