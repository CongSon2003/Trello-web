import { Box } from "@mui/material";
import CardItem from "./Card/Card";
const ListCard = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 1,
        p: "0 5px",
        m: "0 5px",
        overflowX: "hidden",
        overflowY: "auto",
        maxHeight: (theme) =>
          `calc(${theme.Trello.boardContentHeight} - ${theme.spacing(4)} - ${theme.Trello.columnHeaderHeight} - ${theme.Trello.columnFooterHeight})`,
        "&::-webkit-scrollbar, & *::-webkit-scrollbar": {
          width: "8px",
        },
        "&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb": {
          borderRadius: 8,
          backgroundColor: "#ced0da",
        },
        "&::-webkit-scrollbar-thumb:hover, & *::-webkit-scrollbar-thumb:hover":
          {
            backgroundColor: "#959595",
          },
      }}
    >
      <CardItem />
      <CardItem />
      <CardItem />
      <CardItem temporaryHideMadia={true} />
    </Box>
  );
};

export default ListCard;
