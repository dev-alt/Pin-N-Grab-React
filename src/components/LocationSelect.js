import React from 'react';
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Paper,
} from '@mui/material';

function LocationSelect({ location, onChange, locationsData }) {
  return (
    <Paper
      elevation={0}
      sx={{
        borderRadius: '10px',
        padding: '2px',
        width: { xs: '80vw', md: '35vw' },
      }}>
      <FormControl fullWidth sx={{ height: '60px' }}>
        <InputLabel
          style={{
            color: '#7a7974',
            fontFamily: 'Montserrat',
            fontWeight: 'bold',
          }}>
          Where
        </InputLabel>
        <Select value={location} onChange={onChange} variant="standard">
          <MenuItem value="">Select a location</MenuItem>
          {locationsData.map((location) => (
            <MenuItem key={location.id} value={location.id}>
              {`${location.cityName}, ${location.regionName}`}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Paper>
  );
}

function LocationSelectForForm({ location, onChange, locationsData }) {
  return (
    <FormControl fullWidth>
      <InputLabel
        style={{
          color: '#7a7974',
        }}>
        Location
      </InputLabel>
      <Select value={location} onChange={onChange} variant="standard">
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
export { LocationSelectForForm };
