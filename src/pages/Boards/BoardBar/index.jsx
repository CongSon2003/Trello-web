import { Box } from "@mui/material";

const BoardBar = () => {
  return (
    <Box
      sx={{
        backgroundColor: "primary.dark",
        height: (theme) => theme.Trello.boardBarHeight,
        width: "100%",
        display: "flex",
        alignItems: "center",
        color: "#fff",
      }}
    >
      Board_Bar
    </Box>
  );
};

export default BoardBar;
