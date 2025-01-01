// Board Detail
import { Container } from "@mui/material";
import AppBar from "~/components/AppBar/AppBar";
import BoardBar from "./BoardBar/BoardBar";
import BoardContent from "./BoardContent/BoardContent";
import { mockData } from "~/apis/mosk-data";
const Board = () => {
  return (
    <>
      <Container disableGutters maxWidth={false} sx={{ height: "100vh" }}>
        <AppBar />
        <BoardBar Data={mockData.board} />
        <BoardContent Data={mockData.board} />
      </Container>
    </>
  );
};

export default Board;
