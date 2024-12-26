import { Box } from "@mui/material";
import ListColumns from "./ListColumns/ListColumns";

const BoardContent = () => {
  return (
    <Box
      sx={{
        backgroundColor: (theme) =>
          theme.palette.mode === "dark" ? "#34495e" : "#1976d2",
        width: "100%",
        height: (theme) => theme.Trello.boardContentHeight,
        display: "flex",
        padding: "0px 12px 6px 12px",
        gap: 1,
      }}
    >
      <ListColumns />
    </Box>
  );
};

export default BoardContent;
