/* eslint-disable react/prop-types */
import {
  Box,
  Button,
  Menu,
  MenuItem,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { useState } from "react";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import AddIcon from "@mui/icons-material/Add";
import DragHandleIcon from "@mui/icons-material/DragHandle";
import ListCard from "./ListCards/ListCard";
// import { mapOrder } from "~/utilities/sort";
import { CSS } from "@dnd-kit/utilities";
import { useSortable } from "@dnd-kit/sortable";
import ClearIcon from "@mui/icons-material/Clear";
import { toast } from "react-toastify";
const Column = ({ Column, createNewCard }) => {
  const [anchoEl, setAnchoEl] = useState(null);
  const [openNewCard, setOpenNewCard] = useState(false);
  const [newCardTitle, setNewCardTitle] = useState("");
  const toggleOpenNewCard = () => setOpenNewCard(!openNewCard);
  const AddCard = async () => {
    if (!newCardTitle) {
      toast.error("Title is required");
      return;
    }
    // Tạo data để call api
    const newCardData = {
      title : newCardTitle,
      columnId : Column._id
    }
    // Gọi props function createNewCard nằm ở component cha cao nhất là (board/_id.js)
    const result = await createNewCard(newCardData)
    console.log(result);
    if (result) {
      toast.success("Card added successfully");
    }else {
      toast.error("Card creation failed")
    }
    console.log(newCardTitle);
    toggleOpenNewCard();
    setNewCardTitle("");
  };
  const open = Boolean(anchoEl);
  const handleClick = (event) => {
    setAnchoEl(event.currentTarget);
  };
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: Column?._id, data: { ...Column } });
  const styleColumnsDndKit = {
    // TouchAction: "none",
    transform: CSS.Translate.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : undefined,
    height: "100%",
  };
  const handleClose = () => {
    setAnchoEl(null);
  };
  // Column được nấy dữ liệu trong database lên đã sắp xếp ở component cha là (board/_id.js)
  // const orderedCards = mapOrder(Column?.cards, Column?.cardOrderIds, "_id");
  const orderedCards = Column.cards
  return (
    // Phải bọc div ở đây vì vẫn đề chiều cao của column khi kéo thả sẽ có bug kiều flickering
    <div ref={setNodeRef} style={styleColumnsDndKit} {...attributes}>
      <Box
        {...listeners}
        sx={{
          minWidth: "275px",
          maxWidth: "275px",
          bgcolor: (theme) =>
            theme.palette.mode === "dark" ? "#333643" : "#ebecf0",
          borderRadius: "6px",
          height: "fit-content",
          maxHeight: (theme) =>
            `calc(${theme.Trello.boardContentHeight} - ${theme.spacing(4)})`,
        }}
      >
        <Box
          sx={{
            height: (theme) => theme.Trello.columnHeaderHeight,
            display: "flex",
            padding: "8px 8px 0",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography
            variant="h6"
            sx={{
              fontWeight: "bold",
              fontSize: "1rem",
              cursor: "pointer",
              padding: "6px 8px 6px 12px",
            }}
          >
            {Column?.title}
          </Typography>
          <Box
            sx={{
              padding: "8px",
              borderRadius: "7px",
              height: "40px",
            }}
          >
            <Tooltip title={"List actions"}>
              <MoreHorizIcon
                sx={{ color: "text.primary", cursor: "pointer" }}
                id="Button-column-dropdown"
                onClick={handleClick}
                aria-controls={open ? "Menu-column-dropdown" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
              />
            </Tooltip>
            <Menu
              id="Menu-column-dropdown"
              onClose={handleClose}
              anchorEl={anchoEl}
              open={open}
            >
              <MenuItem onClick={handleClose}>Add Card</MenuItem>
              <MenuItem onClick={handleClose}>Copy list</MenuItem>
              <MenuItem onClick={handleClose}>Move list</MenuItem>
              <MenuItem onClick={handleClose}>Remove list</MenuItem>
            </Menu>
          </Box>
        </Box>
        <ListCard cards={orderedCards} />
        <Box
          sx={{
            height: (theme) => theme.Trello.columnFooterHeight,
            display: "flex",
            padding: "8px 8px 0",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {!openNewCard ? (
            <Box
              sx={{
                display: "flex",
                gap: 1,
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <Button
                startIcon={<AddIcon />}
                sx={{ "&:hover": { bgcolor: "#dbe0e6" }, borderRadius: "7px" }}
                onClick={toggleOpenNewCard}
              >
                Add a card
              </Button>
              <Box
                sx={{
                  height: "40px",
                  width: "40px",
                  borderRadius: "7px",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Tooltip title="Drag to move">
                  <DragHandleIcon />
                </Tooltip>
              </Box>
            </Box>
          ) : (
            <Box
              data-no-dnd="true"
              sx={{
                height: "100%",
                display: "flex",
                gap: 1,
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <TextField
                autoFocus
                data-no-dnd="true"
                type="text"
                placeholder="Enter a title card..."
                variant="outlined"
                value={newCardTitle}
                onChange={(e) => setNewCardTitle(e.target.value)}
                sx={{
                  backgroundColor: "white",
                  borderRadius: "7px",
                  ".MuiInputBase-input": { p: "8px" },
                  "& label": { color: "black" },
                  "& input": { color: "black" },
                  "& label.Mui-focused": { color: "black" },
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": { borderColor: "transparent" },
                    "&:hover fieldset": { borderColor: "transparent" },
                    "&.Mui-focused fieldset": {
                      borderColor: (theme) => theme.palette.primary.main,
                    },
                  },
                }}
              ></TextField>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Button
                  data-no-dnd="true"
                  onClick={AddCard}
                  sx={{
                    borderRadius: "7px",
                    fontSize: "0.87rem",
                    backgroundColor: "#0c66e4",
                    boxShadow: "none",
                    color: "white",
                    "&:hover": {
                      bgcolor: (theme) => theme.palette.primary.main,
                    },
                  }}
                >
                  Add
                </Button>
                <Box
                  onClick={toggleOpenNewCard}
                  sx={{ display: "flex", alignItems: "center", gap: 1 }}
                >
                  <ClearIcon
                    sx={{
                      fontSize: "1.5rem",
                      color: "black",
                      cursor: "pointer",
                    }}
                  />
                </Box>
              </Box>
            </Box>
          )}
        </Box>
      </Box>
    </div>
  );
};

export default Column;
