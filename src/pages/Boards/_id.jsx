// Board Detail
import { Box, Container, Typography } from "@mui/material";
import AppBar from "~/components/AppBar/AppBar";
import BoardBar from "./BoardBar/BoardBar";
import BoardContent from "./BoardContent/BoardContent";
import { genaratePlaceHoder } from "~/utilities/formatter";
import CircularProgress from "@mui/material/CircularProgress";
// import { mockData } from "~/apis/mosk-data"; // Mock data
import { useEffect, useState } from "react";
import { fetchBoardDetails_API } from "~/apis";
import {
  fetchColumnCreate_API,
  fetchCardCreate_API,
  fetchBoardUpdate_API,
  fetchColumnUpdate_API,
  fetchMoveCardsBetweenColumns,
} from "~/apis";
import { isEmpty } from "lodash";
import { mapOrder } from "~/utilities/sort";
const Board = () => {
  const [board, setBoard] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      const boardId = "67af67f4400a5289ee289f18";
      const Data_board = await fetchBoardDetails_API(boardId);
      // Sắp xệp thứ tự các column trước khi đưa dữ liệu xuống các tầng khác (các component con)
      Data_board.columns = mapOrder(
        Data_board.columns,
        Data_board.columnOrderIds,
        "_id",
      );

      // Xử lý column rỗng không kéo card từ column khác vào column rỗng được :
      Data_board.columns.forEach((column) => {
        if (isEmpty(column.cards)) {
          column.cards = [genaratePlaceHoder(column)];
          // Cập nhật lại mảng CardOrderIds cho dữ liệu
          column.cardOrderIds = [genaratePlaceHoder(column)._id];
        } else {
          column.cards = mapOrder(column.cards, column.cardOrderIds, "_id");
        }
      });
      console.log(Data_board);
      setBoard(Data_board);
    };
    fetchData();
  }, []);
  // Call Api create Column
  const createNewColumn = async (newColumnData) => {
    console.log(board);
    const response = await fetchColumnCreate_API({
      ...newColumnData,
      boardId: board._id,
    });
    // Khi tạo column mới thì sẽ chưa có card, cần sử lý column rỗng bằng cách tạo card mới những placeHoder = true
    response.cards = [genaratePlaceHoder(response)];
    response.cardOrderIds = [genaratePlaceHoder(response)._id];
    console.log(response);
    // Cập nhật state board
    const newBoard = { ...board };
    newBoard.columns.push(response);
    newBoard.columnOrderIds.push(response._id);
    setBoard(newBoard);
  };
  // Call Api create Card
  const createNewCard = async (newCardData) => {
    const response = await fetchCardCreate_API({
      ...newCardData,
      boardId: board._id,
    });
    // Cập nhật state board
    const newBoardData = { ...board };
    const currentColumn = newBoardData?.columns.find((column) => column._id === response.data.columnId);
    if (currentColumn) {
      // xoá placeholder-card nếu có : 
      currentColumn.cards = currentColumn.cards.filter((card) => !card._id.includes(`placeholder-card`));
      currentColumn.cardOrderIds = currentColumn.cardOrderIds.filter((cardId) => !cardId.includes(`placeholder-card`));
      currentColumn.cards.push(response.data);
      currentColumn.cardOrderIds.push(response.data._id);
    }
    setBoard(newBoardData);
    if (!newBoardData) {
      return false;
    }
    return true;
  };
  const moveColumns = async (dndOrderedColumns) => {
    console.log(dndOrderedColumns);
    const dndOrderedColumnsIds = dndOrderedColumns.map((item) => item._id);
    const newBoard = { ...board };
    (newBoard.columns = dndOrderedColumns),
      (newBoard.columnOrderIds = dndOrderedColumnsIds);
    console.log(dndOrderedColumnsIds);
    console.log(newBoard);
    setBoard(newBoard);
    // Gọi API update board
    await fetchBoardUpdate_API(newBoard._id, {
      columnOrderIds: newBoard.columnOrderIds,
    });
  };
  // Hàm sử lý khi di chuyển card trong 1 column
  /* Chỉ cần gọi API để cập nhật mảng cardOrderedIds của column chứa nó */
  const moveCardsIn = async (columnId, dndOrderedCards) => {
    const dndOrderedCardsIds = dndOrderedCards.map((item) => item._id);
    const newBoard = { ...board };
    // update column trên client
    newBoard.columns.find((column) => column._id === columnId).cardOrderIds =
      dndOrderedCardsIds;
    newBoard.columns.find((column) => column._id === columnId).cards =
      dndOrderedCards;
    console.log(newBoard);
    setBoard(newBoard);
    // Gọi API update column trong database
    await fetchColumnUpdate_API(columnId, { cardOrderIds: dndOrderedCardsIds });
  };
  // Hàm sử lý khi di chuyển card giữa các column
  /* Khi di chuyển card sang Column khác : 
    + B1 : Cập nhật mảng cardOrderIds của column cũ ban đầu chứa nó (xóa card đó khỏi mảng cardOrderIds column cũ)
    + B2 : Cập nhật mảng cardOrderIds của column mới chứa nó (thêm card đó vào mảng cardOrderIds column mới)
    + B3 : Cập nhật lại trường columnId mới của card đã kéo
    => Làm API update 2 column chứa card đó
  */
  const moveCardsBetweenColumns = async (
    activeColumID,
    overColumnID,
    activeDraggingCardId,
    dndOrderedColumns,
  ) => {
    console.log("moveCardsBetweenColumns : ", board);
    const dndOrderedColumnIds = dndOrderedColumns.map((item) => item._id);
    console.log(dndOrderedColumns);
    const newBoard = { ...board };
    newBoard.columns = dndOrderedColumns;
    newBoard.columnOrderIds = dndOrderedColumnIds;
    setBoard(newBoard);
    let prevCardOrderIds = dndOrderedColumns.find(column => column._id === activeColumID).cardOrderIds;
    // Nếu column cũ rỗng thì xóa id placeholder-card
    if (prevCardOrderIds[0].includes("placeholder-card")) {
      prevCardOrderIds = [];
    }
    console.log(newBoard);
    // Call API update 2 column
    fetchMoveCardsBetweenColumns({
      activeColumID,
      activeDraggingCardId,
      overColumnID,
      prevCardOrderIds: prevCardOrderIds,
      nextCardOrderIds: dndOrderedColumns.find(column => column._id === overColumnID).cardOrderIds,
    });
  };
  if (!board) {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          justifyContent: "center",
          alignItems: "center",
          width: "100vw",
          height: "100vh",
        }}
      >
        <CircularProgress />
        <Typography>Loading Board...</Typography>
      </Box>
    );
  }
  return (
    <>
      <Container disableGutters maxWidth={false} sx={{ height: "100vh" }}>
        <AppBar />
        <BoardBar Data={board} />
        <BoardContent
          Data={board}
          createNewColumn={createNewColumn}
          createNewCard={createNewCard}
          moveColumns={moveColumns}
          moveCardsIn={moveCardsIn}
          moveCardsBetweenColumns={moveCardsBetweenColumns}
        />
      </Container>
    </>
  );
};

export default Board;
