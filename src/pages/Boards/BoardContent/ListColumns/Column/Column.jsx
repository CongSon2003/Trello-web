/* eslint-disable react/prop-types */
import {
  Box,
  Button,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
} from "@mui/material";
import { useState } from "react";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import AddIcon from "@mui/icons-material/Add";
import DragHandleIcon from "@mui/icons-material/DragHandle";
import ListCard from "./ListCards/ListCard";
import { mapOrder } from "~/utilities/sort";
import { CSS } from "@dnd-kit/utilities";
import { useSortable } from "@dnd-kit/sortable";
const Column = ({ Column }) => {
  const [anchoEl, setAnchoEl] = useState(null);
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
  const orderedCards = mapOrder(Column?.cards, Column?.cardOrderIds, "_id");
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
          <Button
            startIcon={<AddIcon />}
            sx={{ "&:hover": { bgcolor: "#505d7f" } }}
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
      </Box>
    </div>
  );
};

export default Column;
