import Button from "@mui/material/Button";
import { AccessAlarm, ThreeDRotation, Delete } from "@mui/icons-material";
import Typography from "@mui/material/Typography";
function App() {
  return (
    <div>
      <div>Pham Cong Son</div>
      <Typography variant="h1" color="text.secondary">
        Hello word
      </Typography>
      <Button variant="text">Text</Button>
      <Button variant="contained" color="text.secondary">
        Success
      </Button>
      <Button variant="contained" color="secondary">
        Contained
      </Button>
      <Button variant="outlined">Outlined</Button>
      <div>
        <Delete color="primary" />
        <AccessAlarm color="secondary" />
        <ThreeDRotation color="success" />
      </div>
    </div>
  );
}

export default App;
