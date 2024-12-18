import { Box } from "@mui/material";

const BoardContent = () => {
  return (
    <Box
      sx={{
        backgroundColor: "primary.main",
        width: "100%",
        height: (theme) =>
          `calc(100vh - ${theme.Trello.boardBarHeight} - ${theme.Trello.appBarHeight})`,
        display: "flex",
        alignItems: "center",
        color: "#fff",
      }}
    >
      Board_Content
    </Box>
  );
};

export default BoardContent;
