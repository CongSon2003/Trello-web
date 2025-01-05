/* eslint-disable react/prop-types */
import { Box } from "@mui/material";
import ListColumns from "./ListColumns/ListColumns";
import { mapOrder } from "~/utilities/sort";
import {
  DndContext,
  PointerSensor,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { useEffect, useState } from "react";
import { arrayMove } from "@dnd-kit/sortable";
const BoardContent = ({ Data }) => {
  // Yêu cầu chuột di chuyển 10px thì mới kích hoạt envent
  // Nếu dùng pointerSensor mặc định phải kết hợp thuốc tính CSS touch-action : none ở những phần tử kéo thả
  const pointerSensor = useSensor(PointerSensor, {
    activationConstraint: {
      distance: 10,
    },
  });

  // yêu cầu di chuột 10px thì mới kích hoạt event
  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      distance: 10,
    },
  });
  // nhấn giữ 250ms và dung sai của cảm ứng thì mới kích hoạt event
  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: {
      delay: 10,
      tolerance: 500,
    },
  });
  // const sensors = useSensors(pointerSensor);
  const sensors = useSensors(mouseSensor, touchSensor, pointerSensor);
  const [orderedColumnsState, setOrderedColumnsState] = useState([]);
  const handleDragEnd = (event) => {
    console.log(event);
    const { active, over } = event;
    // Nếu ví trí sau không tồn tài thì return
    if (!over) return;
    if (active.id !== over.id) {
      console.log("Change");
      console.log(orderedColumnsState);
      const ActiveID = orderedColumnsState.findIndex(
        (item) => item._id === active.id,
      );
      const OverId = orderedColumnsState.findIndex(
        (item) => item._id === over.id,
      );
      console.log(ActiveID);
      console.log(OverId);
      // arrayMove cuar Dnd-kit để sắp xếp lại mảng từ mảng ban đầu
      const dndOrderedColumns = arrayMove(
        orderedColumnsState,
        ActiveID,
        OverId,
      );
      setOrderedColumnsState(dndOrderedColumns);
    }
  };
  useEffect(() => {
    const orderedColumns = mapOrder(Data?.columns, Data?.columnOrderIds, "_id");
    setOrderedColumnsState(orderedColumns);
  }, [Data]);
  return (
    <DndContext onDragEnd={handleDragEnd} sensors={sensors}>
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
        <ListColumns columns={orderedColumnsState} />
      </Box>
    </DndContext>
  );
};

export default BoardContent;
