import React from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';

function LocationSelect({ location, onChange, locationsData }) {
  return (
    <FormControl fullWidth>
      <InputLabel style={{ color: '#7a7974' }}>Location</InputLabel>
      <Select value={location} onChange={onChange}>
        <MenuItem value="">Select a location</MenuItem>
        {locationsData.map((location) => (
          <MenuItem key={location.id} value={location.id}>
            {`${location.cityName}, ${location.regionName}`}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

export default LocationSelect;
