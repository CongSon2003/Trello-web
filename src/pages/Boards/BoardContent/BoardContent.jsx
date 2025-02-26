/* eslint-disable react/prop-types */
import { Box } from "@mui/material";
import ListColumns from "./ListColumns/ListColumns";
// import { mapOrder } from "~/utilities/sort";
import {
  DndContext,
  PointerSensor,
  // MouseSensor,
  // TouchSensor,
  useSensor,
  useSensors,
  DragOverlay,
  defaultDropAnimationSideEffects,
  closestCorners,
  pointerWithin,
  rectIntersection,
  getFirstCollision,
  // closestCenter,
} from "@dnd-kit/core";
import { MouseSensor, TouchSensor } from "~/customLib/Dndkit";
import { useCallback, useEffect, useRef, useState } from "react";
import { cloneDeep, isEmpty } from "lodash";
import { arrayMove } from "@dnd-kit/sortable";
import Column from "./ListColumns/Column/Column";
import CardItem from "./ListColumns/Column/ListCards/Card/Card";

const ACTIVE_DRAG_ITEM_TYPE = {
  COLUMN: "ACTIVE_DRAG_ITEM_TYPE_COLUMN",
  CARD: "ACTIVE_DRAG_ITEM_TYPE_CARD",
};
// Cập nhật lại state trong trường hợp di chuyển Card giữa các columns khác nhau

const BoardContent = ({ Data, createNewColumn, createNewCard, moveColumns, moveCardsIn }) => {
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
  // Cùng một thời điểm chỉ có một phần tử đang được kéo (columns hoặc card)
  const [activeDragItemID, setActiveDragItemID] = useState(null); // id của column hoặc card
  const [oldColumnsDraggingCard, setOldColumnsDraggingCard] = useState(null);
  const [activeDragItemType, setActiveDragItemType] = useState(null);
  const [activeDragItemData, setActiveDragItemData] = useState(null);
  // Điểm va chạm cuối cùng (xử lý thuật toán phát hiện va chạm)
  const lastOverId = useRef(null);
  // Khi bắt đầu kéo một phần tử
  const handleDrageStart = (event) => {
    setActiveDragItemID(event?.active?.id);
    setActiveDragItemType(
      event?.active?.data?.current?.columnId
        ? ACTIVE_DRAG_ITEM_TYPE.CARD
        : ACTIVE_DRAG_ITEM_TYPE.COLUMN,
    );
    // Nếu kéo card thì mới thực hiện hành động set giá trị oldColumn
    if (event?.active?.data?.current?.columnId) {
      setOldColumnsDraggingCard(FindColumnsByCardID(event?.active?.id));
    }
    setActiveDragItemData(event?.active?.data?.current);
  };

  // Trigger trong quá trình kéo (drag) một phần tử
  const handleDrageOver = (event) => {
    // Không làm gì thêm nếu đang kéo Column hoặc nếu kéo column thì bỏ qua phần sử lý
    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) return;

    // Còn nếu kéo card thì xử lý thêm để có thể kéo card qua lại giữa các columns
    const { active, over } = event;
    // Cần đảm bảo nếu không tồn tại active hoặc over (Khi kéo ra khỏi phạm vi Container) thì out:
    if (!over || !active) return;
    const {
      id: activeDraggingCardId,
      data: { current: activeDraggingCardData },
    } = active; // id Card đang kéo
    const { id: overCardId } = over; // id của card kéo đến (over)

    // tìm columns theo cardID
    const activeColumn = FindColumnsByCardID(activeDraggingCardId);
    const overColumn = FindColumnsByCardID(overCardId);
    if (!activeColumn || !overColumn) return;

    // Xử lý Logic ở đây. Ở đây chỉ xử lý khi kéo cardItem qua các column khác
    // Đây là xử lý lúc kéo còn kéo xong rồi thì là hàm handleDragEnd
    if (activeColumn._id !== overColumn._id) {
      moveCardforDifferentColumns(
        overColumn,
        overCardId,
        active,
        over,
        activeColumn,
        activeDraggingCardId,
        activeDraggingCardData,
      );
    }
  };

  // Khi kết thúc hành động kéo thả 1 phần tử
  const handleDragEnd = (event) => {
    const { active, over } = event;
    // Nếu ví trí sau không tồn tài thì return
    if (!over || !active) return;

    // Xử lý kéo thả Cards
    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD) {
      console.log("Kéo Cards");
      if (!over || !active) return;
      const {
        id: activeDraggingCardId,
        data: { current: activeDraggingCardData },
      } = active; // id Card đang kéo
      const { id: overCardId } = over; // id của card kéo đến (over)
      // tìm columns theo cardID
      const activeColumn = FindColumnsByCardID(activeDraggingCardId);
      const overColumn = FindColumnsByCardID(overCardId);
      // Nếu không tồn tại 1 trong 2 thì không làm gì hết
      if (!activeColumn || !overColumn) return;
      if (oldColumnsDraggingCard._id !== overColumn._id) {
        console.log("Kéo card ra ngoài Column khác");
        moveCardforDifferentColumns(
          overColumn,
          overCardId,
          active,
          over,
          activeColumn,
          activeDraggingCardId,
          activeDraggingCardData,
        );
      } else {
        console.log("Kéo card trong cùng một Column");
        const oldCardIndex = oldColumnsDraggingCard.cards?.findIndex(
          (item) => item._id === activeDragItemID,
        );
        // index vị trí mới (từ thằng o)
        const NewCardIndex = oldColumnsDraggingCard.cards?.findIndex(
          (item) => item._id === overCardId,
        );
        console.log("OldcardIndex : ", oldCardIndex);
        console.log("NewCardIndex : ", NewCardIndex);
        // Xắp sếp card đã kéo thả
        const dndOrderedCards = arrayMove(
          oldColumnsDraggingCard?.cards,
          oldCardIndex,
          NewCardIndex,
        );
        setOrderedColumnsState((prev) => {
          // clone mảng OrderedColumnState cũ ra một cái mới để xử lý data rồi return
          const nextColumn = cloneDeep(prev);

          // Tìm Column đang kéo thả bên trong :
          const newColumnCurrent = nextColumn.find(
            (column) => column._id === overColumn._id,
          );
          newColumnCurrent.cards = dndOrderedCards;
          newColumnCurrent.cardOrderIds = newColumnCurrent?.cards.map(
            (card) => card._id,
          );
          // trả về giá trị sau kéo kéo card
          return nextColumn;
        });
        // Gọi props function moveCards nằm ở component cha (board/_id.js)
        moveCardsIn(oldColumnsDraggingCard._id, dndOrderedCards);
      }
    }

    // Xử lý kéo thả Columns trong Board Content
    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) {
      console.log("Kéo Columns");
      if (active.id !== over.id) {
        // index Active
        const ActiveID = orderedColumnsState.findIndex(
          (item) => item._id === active.id,
        );
        // index Over
        const OverId = orderedColumnsState.findIndex(
          (item) => item._id === over.id,
        );
        // arrayMove của Dnd-kit để sắp xếp lại mảng từ mảng ban đầu
        const dndOrderedColumns = arrayMove(
          orderedColumnsState,
          ActiveID,
          OverId,
        );
        // Gọi props function moveColumn nằm ở component cha (board/_id.js)
        setOrderedColumnsState(dndOrderedColumns);
        moveColumns(dndOrderedColumns)
      }
    }

    // reset null
    setActiveDragItemData(null);
    setActiveDragItemType(null);
    setActiveDragItemID(null);
    setOldColumnsDraggingCard(null);
  };

  // Tìm Column theo cardId :
  const FindColumnsByCardID = (cardId) => {
    return orderedColumnsState?.find((column) =>
      column?.cards?.map((card) => card._id)?.includes(cardId),
    );
  };
  const moveCardforDifferentColumns = (
    overColumn,
    overCardId,
    active,
    over,
    activeColumn,
    activeDraggingCardId,
    activeDraggingCardData,
  ) => {
    setOrderedColumnsState((prev) => {
      const overCardIndex = overColumn?.cards?.findIndex(
        (card) => card._id === overCardId,
      );
      let newIndex;
      const isBelowOverItem =
        active.rect.current.translated &&
        active.rect.current.translated.top > over.rect.top + over.rect.height;
      const modifier = isBelowOverItem ? 1 : 0;
      newIndex =
        overCardIndex >= 0
          ? overCardIndex + modifier
          : overColumn?.cards.length + 1;

      // Clone mảng OrderedColumnsState cũ ra một cái mới để xử lý data rồi return
      const nextColumn = cloneDeep(prev);
      const nextActiveColumn = nextColumn?.find(
        (column) => column?._id === activeColumn._id,
      );
      const nextOverColumn = nextColumn?.find(
        (column) => column?._id === overColumn._id,
      );
      // Column Cũ
      if (nextActiveColumn) {
        nextActiveColumn.cards = nextActiveColumn.cards.filter(
          (card) => card._id !== activeDraggingCardId,
        );

        // Thêm Placeholder Card nếu Column rỗng : Bị kéo Hết Card đi, Không còn cái nào trong Columns:
        if (isEmpty(nextActiveColumn?.cards)) {
          // Tạo 1 card mới khi columns emtry và card mới không có title và display : none
          nextActiveColumn.cards = [
            {
              _id: `${nextActiveColumn._id}-placeholder-card`,
              boardId: `${nextActiveColumn.boardId}`,
              columnId: nextActiveColumn._id,
              FE_PlaceholderCard: true, // display : none ở phía FE
            },
          ];
        }
        console.log(nextActiveColumn);
        // Cập nhật lại mảng CardOrderIds cho dữ liệu
        nextActiveColumn.cardOrderIds = nextActiveColumn.cards.map(
          (item) => item._id,
        );
      }
      // Column mới
      if (nextOverColumn) {
        nextOverColumn.cards = nextOverColumn?.cards.filter(
          (card) => card._id !== activeDraggingCardId,
        );

        // Thêm cái card đang active (đang kéo) vào overColumn theo ví trí index mới
        nextOverColumn.cards = nextOverColumn.cards.toSpliced(
          newIndex,
          0,
          activeDraggingCardData,
        );
        // Delete Placeholder card khi card rỗng và vừa thêm card mới vào
        nextOverColumn.cards = nextOverColumn.cards.filter(
          (card) => card.FE_PlaceholderCard !== true,
        );
        // Cập nhật lại mảng CardOrderIds cho dữ liệu
        nextOverColumn.cardOrderIds = nextOverColumn.cards.map(
          (item) => item._id,
        );
      }
      return nextColumn;
    });
  };

  // *Animation khi thả (Drop) phần tử
  const dropAnimation = {
    sideEffects: defaultDropAnimationSideEffects({
      styles: {
        active: {
          opacity: "0.5",
        },
      },
    }),
  };

  useEffect(() => {
    // Data là dữ liệu nấy từ database đã được sắp xếp ở board/_id.js rồi lên không cần sắp xếp ở đây nữa.
    // const orderedColumns = mapOrder(Data?.columns, Data?.columnOrderIds, "_id");
    setOrderedColumnsState(Data.columns);
  }, [Data]);
  // args : arguments = Các đối số, tham số
  const collisionDetectionStrategy = useCallback(
    (args) => {
      if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) {
        return closestCorners({ ...args });
      }
      // Tìm các điểm giao nhau , va chạm - interesttions với con trỏ
      const pointerCollisions = pointerWithin(args);
      if (!pointerCollisions?.length) {
        return;
      }
      // Thuật toán phát hiện va chạm sẽ trả về một mảng các va trạm:
      const intersection =
        pointerCollisions?.length > 0
          ? pointerCollisions
          : rectIntersection(args);
      // Tìm overID đầu tiên khi va chạm trong intersection
      let overID = getFirstCollision(intersection, "id");
      if (overID) {
        // Nếu cái over nó là columns thì sẽ tìm tới cái cardID gần nhất bên trong khu vực va chạm đó dựa vào
        // thuật toán phát hiện va chạm closestCenter hoặc closestConers đều được.
        // const checkColumn = orderedColumnsState.find()
        const checkColumn = orderedColumnsState.find(
          (column) => column._id === overID,
        );
        if (checkColumn) {
          overID = closestCorners({
            ...args,
            droppableContainers: args.droppableContainers.filter(
              (container) => {
                return (
                  container.id !== overID &&
                  checkColumn?.cardOrderIds?.includes(container.id)
                );
              },
            ),
          })[0]?.id;
        }
        lastOverId.current = overID;
        return [{ id: overID }];
      }
      return lastOverId.current ? [{ id: lastOverId }] : [];
    },
    [activeDragItemType, orderedColumnsState],
  );
  return (
    <DndContext
      onDragStart={handleDrageStart}
      onDragOver={handleDrageOver}
      onDragEnd={handleDragEnd}
      sensors={sensors}
      // collisionDetection={closestCorners} // Thuật toán phát hiện va trạm : https://docs.dndkit.com/api-documentation/context-provider/collision-detection-algorithms
      collisionDetection={collisionDetectionStrategy}
    >
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
        <DragOverlay dropAnimation={dropAnimation}>
          {!activeDragItemType && null}
          {activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN && (
            <Column Column={activeDragItemData} />
          )}
          {activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD && (
            <CardItem card={activeDragItemData} />
          )}
        </DragOverlay>
        <ListColumns
          columns={orderedColumnsState}
          createNewColumn={createNewColumn}
          createNewCard={createNewCard}
        />
      </Box>
    </DndContext>
  );
};

export default BoardContent;
