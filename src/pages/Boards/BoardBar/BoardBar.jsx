import { Avatar, AvatarGroup, Box, Button, Chip, Tooltip } from "@mui/material";
import PublicIcon from "@mui/icons-material/Public";
import AddToDriveIcon from "@mui/icons-material/AddToDrive";
import FlashOnIcon from "@mui/icons-material/FlashOn";
import FilterListIcon from "@mui/icons-material/FilterList";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import SortIcon from "@mui/icons-material/Sort";
// import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
const MENU_STYLES = (theme) => ({
  alignItems: "center",
  color: theme.palette.mode === "dark" ? "white" : "primary.main",
  bgcolor: theme.palette.mode === "dark" ? "#34495e" : "white",
  borderRadius: "5px",
  "& .MuiSvgIcon-root": {
    color: theme.palette.mode === "dark" ? "white" : "primary.main",
  },
  "& .MuiChip-label": {
    marginTop: "2px",
  },
  "&:hover": {
    bgcolor: "primary.50",
  },
});
const BoardBar = () => {
  return (
    <Box
      sx={{
        height: (theme) => theme.Trello.boardBarHeight,
        display: "flex",
        justifyContent: "space-between",
        overflowX: "auto",
        overflowY: "hidden",
        // borderTop: "1px solid #00bfa5",
        alignItems: "center",
        paddingX: 2,
        bgcolor: (theme) => theme.palette.mode === "dark" && "#34495e",
        // borderBottom: "1px solid #00bfa5",
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
            sx={(theme) => ({
              alignItems: "center",
              color: theme.palette.mode === "dark" ? "white" : "primary.main",
              bgcolor: theme.palette.mode === "dark" ? "#34495e" : "white",
              borderRadius: "5px",
              "& .MuiSvgIcon-root": {
                color: "primary.main",
              },
              "& .MuiChip-label": {
                marginTop: "2px",
                fontWeight: "bold",
                fontSize: "0.9rem",
              },
              "&:hover": {
                bgcolor: "primary.50",
              },
            })}
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
            sx={(theme) => ({
              bgcolor: "#dbe0e6",
              "&:hover": theme.palette.mode === "dark" && { bgcolor: "white" },
              padding: "6px 12px 6px 12px",
              color: theme.palette.mode === "dark" && "black",
            })}
          >
            Board
          </Button>
        </Tooltip>
        <Tooltip title={"star"}>
          <Button
            sx={(theme) => ({
              "&:hover": { bgcolor: "#dbe0e6" },
              "&:hover .MuiSvgIcon-root ":
                theme.palette.mode === "dark"
                  ? { color: "black" }
                  : { color: "primary.main" },
            })}
          >
            <StarBorderIcon
              sx={(theme) => ({
                color: theme.palette.mode === "dark" && "white",
              })}
            />
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
              cursor: "pointer",
              border: "none",
              "&:first-of-type": {
                bgcolor: "#a4b0be",
              },
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
          sx={(theme) => ({
            bgcolor: "#dbe0e6",
            "&:hover": theme.palette.mode === "dark" && { bgcolor: "white" },
            padding: "6px 12px 6px 12px",
            color: theme.palette.mode === "dark" && "black",
          })}
        >
          Share
        </Button>
      </Box>
    </Box>
  );
};

export default BoardBar;
