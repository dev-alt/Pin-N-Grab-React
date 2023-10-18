import React, { useState } from 'react';
import {
  Container,
  Grid,
  Typography,
  Button,
  TextField,
  Paper,
  Avatar,
  IconButton,
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../AuthContext';

const defaultTheme = createTheme();

export default function ProfilePage() {
  const { profile } = useAuth();
  const { id } = useParams();
  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState({ ...profile });

  const { bio, dateOfBirth, gender } = editedProfile;
  const { user } = profile;
  const { email, firstName, lastName } = user;

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = async () => {
    try {
      // Send updated profile data to the server
      await axios.put(`/users/${id}/profile`, {
        bio,
        dateOfBirth,
        gender,
      });
      // Disable editing mode after successful update
      setIsEditing(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    // Reset editedProfile to the current profile data to discard changes
    setEditedProfile({ ...profile });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <Container sx={{ mt: 10 }}>
        <Grid container spacing={3}>
          <Grid item lg={4}>
            <Paper elevation={3} style={{ padding: '16px' }}>
              <Grid container justifyContent="center">
                <Avatar
                  alt="User Avatar"
                  src={
                    isEditing
                      ? editedProfile.profilePicture
                      : profile.profilePicture
                  }
                  sx={{ width: 150, height: 150 }}
                />
              </Grid>
              <Grid>
                <Typography variant="subtitle1" color="textSecondary" align="center">
                  {isEditing ? (
                    <TextField
                      name="jobTitle"
                      value={editedProfile.jobTitle}
                      onChange={handleInputChange}
                    />
                  ) : (
                    profile.username || 'empty'
                  )}
                </Typography>
              </Grid>
            </Paper>
          </Grid>
          <Grid item lg={8}>
            <Paper elevation={3} style={{ padding: '16px' }}>
              <Typography variant="h6" gutterBottom>
                Personal Information
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Typography variant="body1">Username</Typography>
                  <Typography variant="body2" color="textSecondary">
                    {profile.username || 'empty'}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="body1">Email</Typography>
                  <Typography variant="body2" color="textSecondary">
                    {email || 'empty'}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="body1">First Name</Typography>
                  <Typography variant="body2" color="textSecondary">
                    {isEditing ? (
                      <TextField
                        name="firstName"
                        value={firstName}
                        onChange={handleInputChange}
                      />
                    ) : (
                      firstName || 'empty'
                    )}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="body1">Last Name</Typography>
                  <Typography variant="body2" color="textSecondary">
                    {isEditing ? (
                      <TextField
                        name="lastName"
                        value={lastName}
                        onChange={handleInputChange}
                      />
                    ) : (
                      lastName
                    )}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="body1">Bio</Typography>
                  <Typography variant="body2" color="textSecondary">
                    {isEditing ? (
                      <TextField
                        name="bio"
                        value={bio}
                        onChange={handleInputChange}
                      />
                    ) : (
                      profile.profile.bio
                    )}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="body1">Date of Birth</Typography>
                  <Typography variant="body2" color="textSecondary">
                    {isEditing ? (
                      <TextField
                        name="dateOfBirth"
                        value={dateOfBirth}
                        onChange={handleInputChange}
                      />
                    ) : (
                      profile.profile.dateOfBirth || 'empty'
                    )}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="body1">Gender</Typography>
                  <Typography variant="body2" color="textSecondary">
                    {isEditing ? (
                      <TextField
                        name="gender"
                        value={gender}
                        onChange={handleInputChange}
                      />
                    ) : (
                      profile.profile.gender || 'empty'
                    )}
                  </Typography>
                </Grid>
              </Grid>
            </Paper>
            <Paper elevation={3} style={{ marginTop: '16px', padding: '16px' }}>
              <Typography variant="h6" gutterBottom>
                Recent Job Postings
              </Typography>
            </Paper>
          </Grid>
          <Grid container justifyContent="center" mt={2}>
            {isEditing ? (
              <>
                <IconButton onClick={handleSaveClick} color="primary">
                  <SaveIcon />
                </IconButton>
                <IconButton onClick={handleCancelClick} color="secondary">
                  <CancelIcon />
                </IconButton>
              </>
            ) : (
              <>
                <Button variant="contained" color="primary" onClick={handleEditClick}>
                  Edit
                </Button>
              </>
            )}
          </Grid>
        </Grid>
      </Container>
    </ThemeProvider>
  );
}
