import React from 'react';
import { Container, Grid, Card, CardHeader, CardContent, CardActions, Button, TextField, FormControl, InputLabel, Select, MenuItem } from '@mui/material';

const EditProfile = () => {
  // Arrays for day, month, and year options
  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
  ];
  const years = Array.from({ length: 100 }, (_, i) => 2023 - i); // Adjust the range as needed

  return (
    <Container>
      <Grid container spacing={3}>
        {/* ... Other grid items ... */}
        <Grid item xs={12} md={8}>
          <Card>
            <CardHeader title="Edit Profile" />
            <CardContent>
              <Grid container spacing={2}>
                {/* First Name */}
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="First Name"
                    variant="outlined"
                  />
                </Grid>
                {/* Last Name */}
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Last Name"
                    variant="outlined"
                  />
                </Grid>
                {/* Email Address */}
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Email address"
                    variant="outlined"
                  />
                </Grid>
                {/* Contact Number */}
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Contact Number"
                    variant="outlined"
                  />
                </Grid>
                {/* About Me */}
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="About Me"
                    multiline
                    rows={6}
                    variant="outlined"
                  />
                </Grid>
                {/* Website */}
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Website"
                    variant="outlined"
                  />
                </Grid>
                {/* Day of Birth */}
                <Grid item xs={12} sm={4}>
                  <FormControl fullWidth>
                    <InputLabel htmlFor="day">Day</InputLabel>
                    <Select
                      labelId="day"
                      id="day"
                      label="Day"
                    >
                      <MenuItem value="">Select Day</MenuItem>
                      {days.map((day) => (
                        <MenuItem key={day} value={day}>
                          {day}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                {/* Month of Birth */}
                <Grid item xs={12} sm={4}>
                  <FormControl fullWidth>
                    <InputLabel htmlFor="month">Month</InputLabel>
                    <Select
                      labelId="month"
                      id="month"
                      label="Month"
                    >
                      <MenuItem value="">Select Month</MenuItem>
                      {months.map((month, index) => (
                        <MenuItem key={index} value={index + 1}>
                          {month}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                {/* Year of Birth */}
                <Grid item xs={12} sm={4}>
                  <FormControl fullWidth>
                    <InputLabel htmlFor="year">Year</InputLabel>
                    <Select
                      labelId="year"
                      id="year"
                      label="Year"
                    >
                      <MenuItem value="">Select Year</MenuItem>
                      {years.map((year) => (
                        <MenuItem key={year} value={year}>
                          {year}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            </CardContent>
            <CardActions>
              <Button variant="contained" color="success">
                Save
              </Button>
              <Button variant="contained" color="error">
                Cancel
              </Button>
            </CardActions>
          </Card>
          {/* ... Other cards ... */}
        </Grid>
      </Grid>
    </Container>
  );
};

export default EditProfile;
