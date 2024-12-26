import {
  Button,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { Card as MuiCard } from "@mui/material";
import GroupIcon from "@mui/icons-material/Group";
import CommentIcon from "@mui/icons-material/Comment";
import AttachmentIcon from "@mui/icons-material/Attachment";
// eslint-disable-next-line react/prop-types
const CardItem = ({ temporaryHideMadia, asdas }) => {
  console.log(temporaryHideMadia);
  console.log(asdas);
  return !temporaryHideMadia ? (
    <MuiCard
      sx={{
        cursor: "pointer",
        boxShadow: "0 1px 1px rgba(0,0,0,0.2)",
        overflow: "unset",
      }}
    >
      <CardMedia
        sx={{ height: 140 }}
        image="https://imge.com/wp-content/uploads/2019/01/IMGE-CaseStudies-IMGEReveal-Logo-1a.jpg"
        title="green iguana"
      />
      <CardContent sx={{ p: 1.5, "&:last-child": { p: 1.5 } }}>
        <Typography>How to use this board</Typography>
      </CardContent>
      <CardActions sx={{ p: "0 4px 8px 4px" }}>
        <Button size="small" startIcon={<GroupIcon />}>
          20
        </Button>
        <Button size="small" startIcon={<CommentIcon />}>
          15
        </Button>
        <Button size="small" startIcon={<AttachmentIcon />}>
          10
        </Button>
      </CardActions>
    </MuiCard>
  ) : (
    <MuiCard
      sx={{
        cursor: "pointer",
        boxShadow: "0 1px 1px rgba(0,0,0,0.2)",
        overflow: "unset",
      }}
    >
      <CardContent sx={{ p: 1.5, "&:last-child": { p: 1.5 } }}>
        <Typography>How to use this board</Typography>
      </CardContent>
    </MuiCard>
  );
};

export default CardItem;
