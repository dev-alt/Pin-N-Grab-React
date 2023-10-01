import React from 'react';
import { Card, CardHeader, CardContent, CardActions, Button, TextField, FormControl, InputAdornment, IconButton, Input, InputLabel } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const EditPassword = () => {
  const [values, setValues] = React.useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    showCurrentPassword: false,
    showNewPassword: false,
    showConfirmPassword: false,
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = (prop) => () => {
    setValues({ ...values, [prop]: !values[prop] });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <Card>
      <CardHeader title="Edit Password" />
      <CardContent>
        {/* Profile Image */}
        <div className="text-center chat-image mb-5">
          <div className="avatar avatar-xxl chat-profile mb-3 brround">
            <a href="profile.html">
              <img alt="avatar" src="../assets/images/users/7.jpg" className="brround" />
            </a>
          </div>
          <div className="main-chat-msg-name">
            <a href="profile.html">
              <h5 className="mb-1 text-dark fw-semibold">name</h5>
            </a>
            <p className="text-muted mt-0 mb-0 pt-0 fs-13">Web Designer</p>
          </div>
        </div>
        {/* Current Password */}
        <FormControl fullWidth>
          <InputLabel htmlFor="currentPassword">Current Password</InputLabel>
          <Input
            id="currentPassword"
            type={values.showCurrentPassword ? 'text' : 'password'}
            value={values.currentPassword}
            onChange={handleChange('currentPassword')}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle current password visibility"
                  onClick={handleClickShowPassword('showCurrentPassword')}
                  onMouseDown={handleMouseDownPassword}
                >
                  {values.showCurrentPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
        {/* New Password */}
        <FormControl fullWidth>
          <InputLabel htmlFor="newPassword">New Password</InputLabel>
          <Input
            id="newPassword"
            type={values.showNewPassword ? 'text' : 'password'}
            value={values.newPassword}
            onChange={handleChange('newPassword')}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle new password visibility"
                  onClick={handleClickShowPassword('showNewPassword')}
                  onMouseDown={handleMouseDownPassword}
                >
                  {values.showNewPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
        {/* Confirm Password */}
        <FormControl fullWidth>
          <InputLabel htmlFor="confirmPassword">Confirm Password</InputLabel>
          <Input
            id="confirmPassword"
            type={values.showConfirmPassword ? 'text' : 'password'}
            value={values.confirmPassword}
            onChange={handleChange('confirmPassword')}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle confirm password visibility"
                  onClick={handleClickShowPassword('showConfirmPassword')}
                  onMouseDown={handleMouseDownPassword}
                >
                  {values.showConfirmPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
      </CardContent>
      <CardActions>
        <Button variant="contained" color="primary">
          Update
        </Button>
        <Button variant="contained" color="error">
          Cancel
        </Button>
      </CardActions>
    </Card>
  );
};

export default EditPassword;
