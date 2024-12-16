import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  useColorScheme,
} from "@mui/material";
import SettingsBrightnessIcon from "@mui/icons-material/SettingsBrightness";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import NightsStayIcon from "@mui/icons-material/NightsStay";
function App() {
  function SelectSmall() {
    const { mode, setMode } = useColorScheme();
    const handleChange = (event) => {
      const selectedMode = event.target.value;
      console.log(selectedMode);
      setMode(selectedMode);
    };

    return (
      <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
        <InputLabel id="label-select-dark-light-mode">Mode</InputLabel>
        <Select
          labelId="label-select-dark-light-mode"
          id="select-dark-light-mode"
          value={mode || ""}
          label="Mode"
          onChange={handleChange}
        >
          <MenuItem value="light">
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <WbSunnyIcon fontSize="small" /> Light
            </div>
          </MenuItem>
          <MenuItem value="system">
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <SettingsBrightnessIcon fontSize="small" /> System
            </Box>
          </MenuItem>
          <MenuItem value="dark">
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <NightsStayIcon fontSize="small" /> Dark
            </div>
          </MenuItem>
        </Select>
      </FormControl>
    );
  }
  return (
    <div>
      <h1>Hello world</h1>
      <SelectSmall />
    </div>
  );
}

export default App;
