import { Box, Button } from "@mui/material";
import Column from "./Column/Column";
import AddIcon from "@mui/icons-material/Add";
const ListColumns = () => {
  return (
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
      <Column />
      <Column />
      <Column />
      <Column />
      <Column />
      <Column />
      <Column />
      <Column />
      <Column />
      <Column />
      <Column />
      <Column />
      <Column />
      <Column />
      <Column />
      <Column />
      <Box
        sx={{
          minWidth: "275px",
          maxWidth: "275px",
          height: "fit-content",
          bgcolor: "#ffffff3d",
          borderRadius: "7px",
        }}
      >
        <Button
          startIcon={<AddIcon />}
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
    </Box>
  );
};

export default ListColumns;
