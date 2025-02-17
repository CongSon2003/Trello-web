/* eslint-disable react/prop-types */
import { Box } from "@mui/material";
import CardItem from "./Card/Card";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
const ListCard = ({ cards }) => {
  const items = cards.map((i) => i._id);
  return (
    <SortableContext items={items} strategy={verticalListSortingStrategy}>
      {" "}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 1,
          p: "0 5px 5px 5px",
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
        {cards?.map((item) => (
          <CardItem key={item?._id} card={item} />
        ))}
      </Box>
    </SortableContext>
  );
};

export default ListCard;
