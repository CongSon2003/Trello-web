import { Avatar, AvatarGroup, Box, Button, Chip, Tooltip } from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PublicIcon from "@mui/icons-material/Public";
import AddToDriveIcon from "@mui/icons-material/AddToDrive";
import FlashOnIcon from "@mui/icons-material/FlashOn";
import FilterListIcon from "@mui/icons-material/FilterList";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import SortIcon from "@mui/icons-material/Sort";
const MENU_STYLES = {
  alignItems: "center",
  color: "primary.main",
  bgcolor: "white",
  borderRadius: "5px",
  "& .MuiSvgIcon-root": {
    color: "primary.main",
  },
  "& .MuiChip-label": {
    marginTop: "2px",
  },
  "&:hover": {
    bgcolor: "primary.50",
  },
};
const BoardBar = () => {
  return (
    <Box
      sx={{
        // backgroundColor: "primary.dark",
        height: (theme) => theme.Trello.boardBarHeight,
        width: "100%",
        display: "flex",
        justifyContent: "space-between",
        overflow: "auto",
        borderTop: "1px solid #00bfa5",
        alignItems: "center",
        paddingX: 2,
      }}
    >
      <Box
        sx={{
          height: (theme) => theme.Trello.appBarHeight,
          display: "flex",
          alignItems: "center",
          gap: 2,
        }}
      >
        <Tooltip title={"Black Morty"}>
          <Chip
            icon={<DashboardIcon fontSize="small" />}
            sx={MENU_STYLES}
            label="Black Morty"
            clickable
          />
        </Tooltip>
        <Tooltip title={"Change visibility"}>
          <Chip
            icon={<PublicIcon fontSize="small" />}
            sx={MENU_STYLES}
            label="Change visibility"
            clickable
          />
        </Tooltip>
        <Tooltip title={"Add Drive"}>
          <Chip
            icon={<AddToDriveIcon fontSize="small" />}
            sx={MENU_STYLES}
            label="Add Drive"
            clickable
          />
        </Tooltip>
        <Tooltip title={"Board"}>
          <Button
            startIcon={<SortIcon />}
            sx={{
              bgcolor: "#dbe0e6",
              "&:hover": { bgcolor: "primary.50" },
              padding: "6px 12px 6px 12px",
            }}
          >
            Board
          </Button>
        </Tooltip>
      </Box>
      <Box
        sx={{
          height: (theme) => theme.Trello.appBarHeight,
          display: "flex",
          alignItems: "center",
          gap: 2,
        }}
      >
        <Tooltip title={"Automation"}>
          <Chip
            icon={<FlashOnIcon fontSize="small" />}
            sx={MENU_STYLES}
            label="Automation"
            clickable
          />
        </Tooltip>
        <Tooltip title={"Filters"}>
          <Chip
            icon={<FilterListIcon fontSize="small" />}
            sx={MENU_STYLES}
            label="Filters"
            clickable
          />
        </Tooltip>
        <AvatarGroup
          total={5}
          max={4}
          sx={{
            "& .MuiAvatar-root": {
              fontSize: 15,
              width: 34,
              height: 34,
            },
          }}
        >
          <Tooltip title={"CongSon1"}>
            <Avatar alt="CongSon1" src="src/assets/img/avatarCongSon.jpg" />
          </Tooltip>
          <Tooltip title={"CongSon2"}>
            <Avatar alt="CongSon2" src="src/assets/img/avatarCongSon.jpg" />
          </Tooltip>
          <Tooltip title={"CongSon3"}>
            <Avatar alt="CongSon3" src="src/assets/img/avatarCongSon.jpg" />
          </Tooltip>
          <Tooltip title={"CongSon4"}>
            <Avatar alt="CongSon4" src="src/assets/img/avatarCongSon.jpg" />
          </Tooltip>
        </AvatarGroup>
        <Button
          startIcon={<PersonAddIcon />}
          sx={{
            bgcolor: "#dbe0e6",
            "&:hover": { bgcolor: "primary.50" },
            padding: "6px 12px 6px 12px",
          }}
        >
          Share
        </Button>
      </Box>
    </Box>
  );
};

export default BoardBar;
