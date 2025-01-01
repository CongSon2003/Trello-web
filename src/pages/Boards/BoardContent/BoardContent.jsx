/* eslint-disable react/prop-types */
import { Box } from "@mui/material";
import ListColumns from "./ListColumns/ListColumns";
import { mapOrder } from "~/utilities/sort";
const BoardContent = ({ Data }) => {
  const orderedColumns = mapOrder(Data?.columns, Data?.columnOrderIds, "_id");
  return (
    <Box
      sx={{
        backgroundColor: (theme) =>
          theme.palette.mode === "dark" ? "#192a56" : "#1976d2",
        width: "100%",
        height: (theme) => theme.Trello.boardContentHeight,
        display: "flex",
        padding: "0px 12px 6px 12px",
        gap: 1,
      }}
    >
      <ListColumns columns={orderedColumns} />
    </Box>
  );
};

export default BoardContent;
