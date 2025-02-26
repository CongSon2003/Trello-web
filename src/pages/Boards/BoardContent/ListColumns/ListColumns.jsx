/* eslint-disable react/prop-types */
import { Box, Button, TextField } from "@mui/material";
import Column from "./Column/Column";
import AddIcon from "@mui/icons-material/Add";
import { toast } from "react-toastify";
import {
  SortableContext,
  horizontalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useState } from "react";
import ClearIcon from "@mui/icons-material/Clear";
const ListColumns = ({ columns, createNewColumn, createNewCard }) => {
  const items = columns?.map((item) => item._id); //[{'id1'},{'id1'},{'id1'}] => ['id1','id2','id3']
  const [openNewColumn, setOpenNewColumn] = useState(false);
  const [newColumnTitle, setNewColumnTitle] = useState("");
  const toggleOpenNewColumn = () => setOpenNewColumn(!openNewColumn);
  const AddColumn = async () => {
    if (!newColumnTitle) {
      toast.error("Title is required");
      return;
    }
    // Tạo Column
    const newColumnData = {
      title: newColumnTitle,
    };
    // Gọi props function createNewColumn nằm ở component cha cao nhất là (board/_id.js)
    await createNewColumn(newColumnData);
    // Hiện thông báo khi tạo thành công
    notify("Column added successfully");

    // Đóng trạng thái thêm column và clear data
    toggleOpenNewColumn();
    setNewColumnTitle("");
  };
  const notify = (message) => toast(message);
  return (
    <SortableContext items={items} strategy={horizontalListSortingStrategy}>
      <Box
        sx={{
          bgcolor: "inherit",
          width: "100%",
          height: "100%",
          display: "flex",
          overflowX: "auto",
          overflowY: "hidden",
          p: "12px 0",
          gap: 1,
          "&::-webkit-scrollbar-track": { m: 0 },
        }}
      >
        {columns.map((item) => {
          return (
            <Column
              key={item._id}
              Column={item}
              createNewCard={createNewCard}
            />
          );
        })}
        {!openNewColumn ? (
          <Box
            onClick={toggleOpenNewColumn}
            sx={{
              minWidth: "250px",
              maxWidth: "250px",
              height: "fit-content",
              bgcolor: "#ffffff3d",
              borderRadius: "7px",
            }}
          >
            <Button
              startIcon={<AddIcon />}
              id="addAnotherList"
              sx={{
                color: "white",
                width: "100%",
                justifyContent: "flex-start",
                pl: 2.5,
                py: 1,
              }}
            >
              Add another list
            </Button>
          </Box>
        ) : (
          <Box
            sx={{
              minWidth: "250px",
              maxWidth: "250px",
              height: "fit-content",
              bgcolor: "#ffffff3d",
              borderRadius: "7px",
              flexDirection: "column",
              display: "flex",
              backgroundColor: "#ebecf0",
              gap: 1,
              p: 1,
            }}
          >
            <TextField
              placeholder="Enter title..."
              type="text"
              size="small"
              variant="outlined"
              value={newColumnTitle}
              onChange={(e) => setNewColumnTitle(e.target.value)}
              autoFocus
              sx={{
                backgroundColor: "white",
                borderRadius: "7px",
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
                variant="contained"
                color="success"
                onClick={AddColumn}
                id="addColumn"
                sx={{
                  borderRadius: "7px",
                  backgroundColor: "#0c66e4",
                  boxShadow: "none",
                  color: "white",
                  border: "0.5px solid ",
                  borderColor: (theme) => theme.palette.primary.main,
                  "&:hover": { bgcolor: (theme) => theme.palette.primary.main },
                }}
              >
                Add Column
              </Button>
              <Box
                onClick={toggleOpenNewColumn}
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
    </SortableContext>
  );
};

export default ListColumns;
