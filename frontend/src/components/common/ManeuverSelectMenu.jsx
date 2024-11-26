import { TextField, MenuItem } from '@mui/material';

const ManeuverSelectMenu = ({ value, handleChange }) => {
  return (
    <TextField
      select
      fullWidth
      label="Maneuver"
      name="maneuver"
      value={value}
      onChange={handleChange}
      variant="outlined"
      required
      className="bg-white"
      size="small">
      <MenuItem value="" disabled>
        Select Maneuver
      </MenuItem>
      <MenuItem value="Pre Trip">Pre Trip</MenuItem>
      <MenuItem value="Straight Back">Straight Back</MenuItem>
      <MenuItem value="Off Set">Off Set</MenuItem>
      <MenuItem value="Road">Road</MenuItem>
    </TextField>
  );
};

export default ManeuverSelectMenu;
