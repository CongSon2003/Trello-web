// Board Detail
import { Container } from "@mui/material";
import AppBar from "~/components/AppBar/AppBar";
import BoardBar from "./BoardBar/BoardBar";
import BoardContent from "./BoardContent/BoardContent";
import { mockData } from "~/apis/mosk-data"; // Mock data
import { useEffect, useState } from "react";
import { fetchBoardDetails_API } from "~/apis";
const Board = () => {
  const [board, SetBoard] = useState(null);
  useEffect(() => {
    // Define the async function inside useEffect
    const boardId = '67af67f4400a5289ee289f18'
    fetchBoardDetails_API(boardId).then(board => {
      SetBoard(board)
      return
    })
  },[])
  console.log(board);
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
