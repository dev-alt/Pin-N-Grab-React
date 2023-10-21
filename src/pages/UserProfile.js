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
  Tooltip,
  Divider,
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../AuthContext';
import { themeOptions } from '../Theme';
import { Box } from '@mui/system';

const defaultTheme = createTheme(themeOptions);

export default function ProfilePage() {
  const { profile } = useAuth();
  const { id } = useParams();
  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState({ ...profile });

  const { bio, dateOfBirth, gender } = editedProfile;
  const { user } = profile;
  const { firstName, lastName } = user;

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

  const TextBox = ({ tag, text }) => {
    return (
      <Box sx={{ marginTop: '20px', marginBottom: '30px' }}>
        <Typography
          variant="h5"
          gutterBottom
          sx={{ fontSize: { xs: 'medium', sm: '1.5rem' } }}
        >
          {tag}
        </Typography>
        <Typography
          variant="h6"
          gutterBottom
          color="#9c9c9c"
          sx={{ fontSize: { xs: 'small', sm: '1.2rem' } }}
        >
          {text}
        </Typography>
        <Divider variant="fullwidth" light></Divider>
      </Box>
    );
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <Container sx={{ mt: 10 }}>
        <Paper elevation={3} sx={{ marginTop: '100px', borderRadius: '20px' }}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'centre',
              flexDirection: { xs: 'column', sm: 'column', md: 'row' },
              padding: '2rem',
              justifyContent: 'space-between',
              justifyItems: 'center',
            }}
          >
            <Box sx={{ padding: '16px', textAlign: 'center' }}>
              <Grid container justifyContent="center">
                <Avatar
                  alt="User Avatar"
                  src={`/avatars/avatar_${profile.profile.avatar}.jpg`}
                  sx={{
                    width: { xs: 200, sm: 250 },
                    height: { xs: 200, sm: 250 },
                  }}
                />
              </Grid>

              <Grid>
                <Grid container justifyContent="center" mt={2}>
                  {isEditing ? (
                    <>
                      <Tooltip title="Save" placement="top">
                        <IconButton onClick={handleSaveClick} color="primary">
                          <SaveIcon sx={{ fontSize: '3rem' }} />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Cancel" placement="top">
                        <IconButton
                          onClick={handleCancelClick}
                          color="secondary"
                        >
                          <CancelIcon sx={{ fontSize: '3rem' }} />
                        </IconButton>
                      </Tooltip>
                    </>
                  ) : (
                    <Tooltip title="Edit" placement="top">
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={handleEditClick}
                      >
                        Edit
                      </Button>
                    </Tooltip>
                  )}
                </Grid>
              </Grid>
            </Box>

            <Container>
              <Typography
                variant="h4"
                sx={{
                  fontWeight: 'bold',
                  fontSize: { xs: 'large', sm: '2rem' },
                }}
              >
                Personal Information
              </Typography>
              <Box style={{ padding: '16px' }}>
                {/* Usersname */}
                <TextBox
                  tag="User Name"
                  text={profile.username || 'empty'}
                ></TextBox>

                {/* Email */}
                <TextBox
                  tag="Email"
                  text={profile.user.email || 'empty'}
                ></TextBox>

                {/* First Name */}
                <TextBox
                  tag="First Name"
                  text={
                    isEditing ? (
                      <TextField
                        name="firstName"
                        value={firstName}
                        variant="standard"
                        fullWidth
                        onChange={handleInputChange}
                      />
                    ) : (
                      firstName || 'empty'
                    )
                  }
                ></TextBox>

                {/* Last Name */}
                <TextBox
                  tag="Last Name"
                  text={
                    isEditing ? (
                      <TextField
                        name="lastName"
                        value={lastName}
                        onChange={handleInputChange}
                        variant="standard"
                        fullWidth
                      />
                    ) : (
                      profile.user.lastName
                    )
                  }
                ></TextBox>

                {/* Bio */}
                <TextBox
                  tag="Biography"
                  text={
                    isEditing ? (
                      <TextField
                        name="bio"
                        value={profile.profile.bio}
                        onChange={handleInputChange}
                        variant="standard"
                        fullWidth
                      />
                    ) : (
                      profile.profile.bio || 'empty'
                    )
                  }
                ></TextBox>

                {/* DOB */}
                <TextBox
                  tag="Date of Birth"
                  text={
                    isEditing ? (
                      <TextField
                        name="dateOfBirth"
                        value={profile.profile.dateOfBirth}
                        onChange={handleInputChange}
                        variant="standard"
                        fullWidth
                      />
                    ) : (
                      profile.profile.dateOfBirth || 'empty'
                    )
                  }
                ></TextBox>

                {/* Gender */}
                <TextBox
                  tag="Gender"
                  text={
                    isEditing ? (
                      <TextField
                        name="gender"
                        value={profile.profile.gender}
                        onChange={handleInputChange}
                        variant="standard"
                        fullWidth
                      />
                    ) : (
                      profile.profile.gender || 'empty'
                    )
                  }
                ></TextBox>
              </Box>
              <Paper
                elevation={1}
                style={{ marginTop: '16px', padding: '16px' }}
              >
                <Typography
                  variant="h5"
                  gutterBottom
                  sx={{
                    fontWeight: 'bolder',
                    fontSize: { xs: 'medium', sm: 'large' },
                  }}
                >
                  Recent Job Postings
                </Typography>
              </Paper>
            </Container>
          </Box>
        </Paper>
      </Container>
    </ThemeProvider>
  );
}
