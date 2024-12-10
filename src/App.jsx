import Button from "@mui/material/Button";
import { AccessAlarm, ThreeDRotation, Delete } from "@mui/icons-material";
function App() {
  return (
    <div>
      <div>Pham Cong Son</div>
      <Button variant="text">Text</Button>
      <Button variant="contained">Contained</Button>
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
